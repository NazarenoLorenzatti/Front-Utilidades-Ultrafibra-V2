import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { NgPrimeModule } from './ng-prime.module';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    NavComponent,
    FooterComponent
  ],
  exports:[
    NavComponent,
    FooterComponent
  ],
  imports: [
    MaterialModule,
    NgPrimeModule,
    RouterModule,
    CommonModule
  ]
})
export class TemplateModule { }
