import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MemberDetailDto } from '../profile/memberDetailDto.model';
import { ResponseModel } from '../shared/response.model';
import { SingleResponseModel } from '../shared/singleResponse.model';
import {User} from '../shared/user.model';
import { LoginModel } from './login/login.model';
import { RegisterModel } from './register/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path:string=environment.path+"auth/"
  public user = new BehaviorSubject<User>(null);
  constructor(private http:HttpClient,private router:Router) { }

  Register(registerModel:RegisterModel):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.path+"register",registerModel);
  }

  Login(loginModel:LoginModel):Observable<SingleResponseModel<MemberDetailDto>>{
    return this.http.post<SingleResponseModel<MemberDetailDto>>(this.path+"login",loginModel).pipe(
      tap(response=>{
        const loadedUser = new User(response.data.email,response.data.id,response.data.firstName + " " + response.data.lastName);
        this.user.next(loadedUser);
        localStorage.setItem("user",JSON.stringify(loadedUser));
      })
    );
  }

  autoLogin(){
    let userData = JSON.parse(localStorage.getItem("user"));
    if(!userData){
      return;
    }
    const loadedUser = new User(userData.email,userData.id,userData.firstName + " " + userData.lastName);
    if(loadedUser){
      this.user.next(loadedUser);
    }
  }

  logOut(){
    localStorage.removeItem("user");
    this.router.navigateByUrl("/login");
  }
}
