import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppCommonsComponent } from "./app-commons/app-commons.component";
import { HomeComponent } from "./home/home.component";

const constRutasHijas: Routes = [
    { path: 'app', component: AppCommonsComponent},
    { path: 'home', component: HomeComponent},
  ]
  
  @NgModule({
    imports: [RouterModule.forChild(constRutasHijas)],
    exports: [RouterModule],
  })
  export class RouterChildModule { }