import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AplicationModule } from './modules/aplication/aplication.module';
import { LoginAppModule } from './modules/login-app/login-app.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AplicationModule,
    LoginAppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
