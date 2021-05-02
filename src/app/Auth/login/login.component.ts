import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private authService:AuthService,private router:Router,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(3)]),
    });
  }

  login(){
    let model= Object.assign({},this.loginForm.value);
    this.authService.Login(model).subscribe(response=>{
      this.router.navigateByUrl("/profile");
    },error=>{
      this.snackBar.open(error.error,null,{duration:5000});
    });
  }
}