import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExperienceService } from 'src/app/experience/experience.service';
import { Mode } from 'src/app/shared/add-edit-mode.enum';
import { EducationModel } from '../education.model';
import { EducationService } from '../education.service';

@Component({
  selector: 'app-education-add-edit',
  templateUrl: './education-add-edit.component.html',
  styleUrls: ['./education-add-edit.component.css'],
})
export class EducationAddEditComponent implements OnInit {
  mode: Mode;
  enumType = Mode;
  addEditForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EducationAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eduService: EducationService,
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
      subtitle: new FormControl(null, Validators.required),
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

  send() {
    let model: EducationModel = Object.assign({}, this.addEditForm.value);
    //boş tarihi boş string olarak kopyalıyor, bu da api tarafında hataya yol açıyor.

    model.memberId = this.data.memberId;
    console.log(model);

    if (this.mode == Mode.Add) {
      this.eduService.Add(model).subscribe(
        (response) => {
          this.snackBar.open(response.message, null, { duration: 5000 });
        this.dialogRef.close(true);

        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      model.id = this.data.model.id;
      this.eduService.Update(model).subscribe(
        (response) => {
          this.snackBar.open(response.message, null, { duration: 5000 });
        this.dialogRef.close(true);

        },
        (error) => {
          console.log(error);

        }
      );
    }
  }

  deleteEdu() {
    if (
      !confirm(
        'Gerçekten bu eğitim bilgisini silmek istediğinize emin misiniz ?'
      ).valueOf()
    ) {
      return;
    }
    this.eduService.delete(this.data.model).subscribe(
      (response) => {
        this.snackBar.open(response.message, null, { duration: 5000 });
        this.dialogRef.close(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
