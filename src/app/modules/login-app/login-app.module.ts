import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { MaterialModule } from '../templates/material.module';
import { NgPrimeModule } from '../templates/ng-prime.module';
import { TemplateModule } from '../templates/template.module';
import { LoginCommonsComponent } from './login-commons/login-commons.component';
import { SignupComponent } from './new-user/components/signup/signup.component';
import { ConfirmationInfoComponent } from './new-user/components/confirmation-info/confirmation-info.component';
import { PersonalInfoComponent } from './new-user/components/personal-info/personal-info.component';

@NgModule({
  declarations: [
    LoginComponent,
    NewUserComponent,
    LoginCommonsComponent,
    SignupComponent,
    ConfirmationInfoComponent,
    PersonalInfoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgPrimeModule,
    TemplateModule
  ]
})
export class LoginAppModule { }
