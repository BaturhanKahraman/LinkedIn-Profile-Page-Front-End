import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css'],
})
export class ProfilePictureComponent implements OnInit {
  selectedFile: File = null;
  loading:boolean=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProfilePictureComponent>,
    private profileService:ProfileService,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSelectedFile(fileInput:any){
    this.selectedFile=<File> fileInput.target.files[0];
  }
  onSubmit(){
    if(!this.selectedFile){
      this.snackBar.open("Lütfen ilk önce bir dosya seçin",null,{duration:3000});
      return;
    }
    this.loading=true;
    const formData = new FormData();
    formData.append('memberId',this.data.memberId);
    formData.append('image',this.selectedFile);

    this.profileService.uploadProfilePicture(formData).subscribe(data=>{
      this.snackBar.open("Fotoğrafınız başarıyla yüklendi",null,{duration:5000});
      this.dialogRef.close(true);
    },error=>{
      this.snackBar.open(error.error,null,{duration:5000});
    },()=>{
      this.loading=false;
    });
  }
}
