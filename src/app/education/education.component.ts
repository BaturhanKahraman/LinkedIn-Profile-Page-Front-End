import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Mode } from '../shared/add-edit-mode.enum';
import { EducationAddEditComponent } from './education-add-edit/education-add-edit.component';
import { EducationModel } from './education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  @Input() educations:EducationModel[];
  @Input() memberId:number;
  @Output() statusUpdated = new EventEmitter();

  mode=Mode;
  constructor(
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }
  openDialog(addEditMode:Mode,model:EducationModel){
     const dialogRef = this.dialog.open(EducationAddEditComponent,{
        data:{
          mode:addEditMode,
          model:model,
          memberId:this.memberId
        },
        height:"550px",
        width:"500px",
      });
      dialogRef.afterClosed().subscribe(data=>{
        if(data===true){
          this.statusUpdated.emit();
        }
      })
  }

}
