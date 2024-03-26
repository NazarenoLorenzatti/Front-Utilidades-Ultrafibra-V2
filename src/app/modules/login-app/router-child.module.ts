import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NewUserComponent } from "./new-user/new-user.component";
import { LoginCommonsComponent } from "./login-commons/login-commons.component";
import { SignupComponent } from "./new-user/components/signup/signup.component";
import { ConfirmationInfoComponent } from "./new-user/components/confirmation-info/confirmation-info.component";
import { PersonalInfoComponent } from "./new-user/components/personal-info/personal-info.component";

const constRutasHijas: Routes = [
    { path: '', component: LoginCommonsComponent },
    { path: 'signin', component: LoginCommonsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'guardar-usuario', component: NewUserComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'info', component: PersonalInfoComponent },
    { path: 'confirmar', component: ConfirmationInfoComponent },
  ]
  
  @NgModule({
    imports: [RouterModule.forChild(constRutasHijas)],
    exports: [RouterModule],
  })
  export class RouterChildModule { }