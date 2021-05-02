import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EducationModel } from '../education/education.model';
import { ResponseModel } from '../shared/response.model';
import { ExperienceModel } from './experince.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  path=environment.path+"Experience/";  
  constructor(private http:HttpClient) { }

  Update(model:ExperienceModel ):Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.path+"Update",model);
  }

  Add(model:ExperienceModel) {
    return this.http.post<ResponseModel>(this.path+"Add",model);
  }
  delete(model: any) {
    return this.http.post<ResponseModel>(this.path+"Delete",model);
  }
}
