import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonsComponent } from './app-commons/app-commons.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../templates/material.module';
import { NgPrimeModule } from '../templates/ng-prime.module';
import { TemplateModule } from '../templates/template.module';



@NgModule({
  declarations: [
    AppCommonsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgPrimeModule,
    TemplateModule
  ]
})
export class AplicationModule { }
