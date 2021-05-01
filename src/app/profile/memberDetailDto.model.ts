import { EducationModel } from "../education/education.model";
import { ExperienceModel } from "../experience/experince.model";

export interface MemberDetailDto{
   id: number;
   userId:number;
   currentPlace:string;
   email:string;
   firstName:string;
   lastName:string;
   degree:string;
   about:string;
   profilePower:number;
   view:number;
   experiences:ExperienceModel[];
   educations:EducationModel[];
   skills:any;
}