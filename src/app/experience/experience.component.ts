import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Mode } from '../shared/add-edit-mode.enum';
import { ExperienceAddEditComponent } from './experience-add-edit/experience-add-edit.component';
import { ExperienceModel } from './experince.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  @Input() experiences: ExperienceModel[];
  @Input() memberId: number;
  @Output() statusUpdated = new EventEmitter();
  mode = Mode;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  openDialog(addEditMode: Mode, model: ExperienceModel) {
    const dialogRef = this.dialog.open(ExperienceAddEditComponent, {
      data: {
        mode: addEditMode,
        model: model,
        memberId: this.memberId,
      },
      height: '550px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      
      if (data === true) {
        this.statusUpdated.emit();
      }
    });
  }
}
