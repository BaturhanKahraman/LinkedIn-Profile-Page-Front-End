import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../shared/response.model';
import { SkillModel } from './skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  path=environment.path+"skill/"
  constructor(private http:HttpClient) { }

  saveRange(skills:SkillModel[]):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.path+"saveRange",skills);
  }
}
