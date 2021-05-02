import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../Auth/auth.service';
import { User } from '../shared/user.model';
import { MemberDetailDto } from './memberDetailDto.model';
import { ProfileService } from './profile.service';
import {ProfileEditComponent} from './profile-edit/profile-edit.component'
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  address:string=environment.address;
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
        console.log(this.member);
        
      }
    );
  }

  openEditDialog(){
    const dialogRef = this.dialog.open(ProfileEditComponent,{
      height:"430px",
      width:"500px",
      data:{member:this.member}
    });

    dialogRef.afterClosed().subscribe(data=>{
      if(data==true){
        this.getUserData();
      }
    })
  }
  openProfilePictureDialog(){
    const dialogRef = this.dialog.open(ProfilePictureComponent,{
      height:"180px",data:{
        memberId:this.user.id
      }});
      dialogRef.afterClosed().subscribe(data=>{
        if(data===true){
          this.refreshMember();
        }
      })
  }
  refreshMember(){
    this.getUserData();
  }
  Logout(){
    this.authService.logOut();
  }

  
}
