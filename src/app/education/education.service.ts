import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../shared/response.model';
import { EducationModel } from './education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  path=environment.path+"Education/";
    delete(model: EducationModel):Observable<ResponseModel>  {
    return this.http.post<ResponseModel>(this.path+"delete",model);
  }
  constructor(private http:HttpClient) {}
  Update(model: EducationModel):Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.path+"update",model);
  }
  Add(model: EducationModel):Observable<ResponseModel> {
    console.log(model);
    return this.http.post<ResponseModel>(this.path+"Add",model);
  }

}
