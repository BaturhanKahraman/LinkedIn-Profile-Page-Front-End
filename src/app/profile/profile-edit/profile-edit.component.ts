import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../profile.service';
import { MemberUpdateModel } from './member-update.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  profileEditForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.patchValues();
  }
  createForm() {
    this.profileEditForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      currentPlace: new FormControl('', [Validators.required]),
      degree: new FormControl('', [Validators.required]),
      about: new FormControl('', [Validators.required]),
    });
  }
  patchValues() {
    this.profileEditForm.patchValue({
      name: this.data.member.firstName,
      surname: this.data.member.lastName,
      currentPlace: this.data.member.currentPlace,
      degree: this.data.member.degree,
      about: this.data.member.about,
    });
  }
  updateProfile() {
    let model: MemberUpdateModel = Object.assign(
      {},
      this.profileEditForm.value
    );
    model.id = this.data.member.id;
    this.profileService.updateProfile(model).subscribe();
  }
}
