import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileEditForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.profileEditForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      surname: new FormControl('',[Validators.required]),
      currentPlace: new FormControl('',[Validators.required]),
      degree: new FormControl('',[Validators.required]),
      about: new FormControl('',[Validators.required])
    })
  }
  updateProfile(){
    console.log(this.profileEditForm.value);
  }
}
