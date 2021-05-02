import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { SkillComponent } from './skill/skill.component';
import { ExperienceAddEditComponent } from './experience/experience-add-edit/experience-add-edit.component';
import { EducationAddEditComponent } from './education/education-add-edit/education-add-edit.component';
import { ProfilePictureComponent } from './profile/profile-picture/profile-picture.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EducationComponent,
    ExperienceComponent,
    ProfileEditComponent,
    SkillComponent,
    ExperienceAddEditComponent,
    EducationAddEditComponent,
    ProfilePictureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ProfileEditComponent,
    EducationAddEditComponent,
    ExperienceAddEditComponent,
    ProfilePictureComponent,
  ],
})
export class AppModule {}
