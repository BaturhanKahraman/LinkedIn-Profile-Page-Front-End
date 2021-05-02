import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { RegisterModel } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  constructor(private authService:AuthService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.registerForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(3)]),
      name:new FormControl('',[Validators.required,Validators.minLength(3)]),
      lastname:new FormControl('',[Validators.required,Validators.minLength(3)]),
    });
  }

  Register(){
    const model:RegisterModel=Object.assign({},this.registerForm.value);
    this.authService.Register(model).subscribe(response=>{
      if(response.success){
        this.snackBar.open(response.message,null,{duration:5000});
      }
    },error=>{
      this.snackBar.open(error.error,null,{duration:5000});
    });
  }
}
