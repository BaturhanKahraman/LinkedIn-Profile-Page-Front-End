import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../shared/singleResponse.model';
import { MemberDetailDto } from './memberDetailDto.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  path=environment.path+"member/";
  constructor(private http:HttpClient) { }

  getProfileById(id:number):Observable<SingleResponseModel<MemberDetailDto>>{
    return this.http.get<SingleResponseModel<MemberDetailDto>>(this.path + "GetById?id="+id);
  }
}
