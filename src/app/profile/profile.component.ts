import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../Auth/auth.service';
import { User } from '../shared/user.model';
import { MemberDetailDto } from './memberDetailDto.model';
import { ProfileService } from './profile.service';
import {ProfileEditComponent} from './profile-edit/profile-edit.component'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  member:MemberDetailDto;
  user:User;
  constructor(private authService:AuthService,
    private profileService:ProfileService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.authService.user.subscribe(
      user=>{
        this.user=user;
      }
    );
      this.getUserData();
  }

  getUserData(){
    this.profileService.getProfileById(this.user.id).subscribe(
      response=>{
        this.member=response.data;
        console.log( "member bilgileri");
        console.log(this.member);
        
      }
    );
  }

  openEditDialog(){
    this.dialog.open(ProfileEditComponent);
  }
}
