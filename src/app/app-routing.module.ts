import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterApplicationModule } from './modules/aplication/router-aplication.module';
import { RouterLoginModule } from './modules/login-app/router-login.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/signin'},
  { path: 'signin', pathMatch: 'full', redirectTo: '/signin'},
  { path: 'app', pathMatch: 'full', redirectTo: '/app'},  
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {enableTracing: false, useHash: true}
    ),
    RouterApplicationModule,
    RouterLoginModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
