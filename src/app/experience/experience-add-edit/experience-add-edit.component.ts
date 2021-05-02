import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mode } from 'src/app/shared/add-edit-mode.enum';
import { ExperienceService } from '../experience.service';
import { ExperienceModel } from '../experince.model';

@Component({
  selector: 'app-experience-add-edit',
  templateUrl: './experience-add-edit.component.html',
  styleUrls: ['./experience-add-edit.component.css'],
})
export class ExperienceAddEditComponent implements OnInit {
  mode: Mode;
  enumType = Mode;
  addEditForm: FormGroup;
  @Input() educations: ExperienceModel[];
  @Input() memberId: number;
  constructor(
    public dialogRef: MatDialogRef<ExperienceAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private expService: ExperienceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.patchValues();
    this.mode = this.data.mode;
  }

  createForm() {
    this.addEditForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      place: new FormControl(null, Validators.required),
      startedDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null),
      city: new FormControl(null, Validators.required),
    });
  }

  patchValues() {
    if (this.data.model) {
      this.addEditForm.patchValue({
        title: this.data.model.title,
        subtitle: this.data.model.subtitle,
        place: this.data.model.place,
        startedDate: this.data.model.startedDate,
        endDate: this.data.model.endDate,
        city: this.data.model.city,
      });
    }
  }

  send(){
    let model:ExperienceModel = Object.assign({},this.addEditForm.value);
    
    model.memberId=this.data.memberId;
    console.log(model);
    
    if(this.mode==Mode.Add){
      this.expService.Add(model).subscribe(response=>{
       this.snackBar.open(response.message,null,{duration:5000});
       this.dialogRef.close(true);

      },error=>{
        console.log(error);
      });
    }else{
      model.id=this.data.model.id;
      this.expService.Update(model).subscribe(response=>{
        this.snackBar.open(response.message,null,{duration:5000});
        this.dialogRef.close(true);

       },error=>{
         console.log(error);
       });
    }
  }

  deleteEdu(){
    if(!confirm("Gerçekten bu deneyim bilgisini silmek istediğinize emin misiniz ?").valueOf()){
      return;
    }
    this.expService.delete(this.data.model).subscribe(
      response=>{
        this.snackBar.open(response.message,null,{duration:5000});
        this.dialogRef.close(true);
       },error=>{
         console.log(error);
        this.snackBar.open("Silinirken bir hata meydana geldi.",null,{duration:5000});
       }
    );
    
  }
}
