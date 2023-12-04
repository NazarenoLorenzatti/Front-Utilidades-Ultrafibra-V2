import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterApplicationModule } from './modules/aplication/router-aplication.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/äpp'},
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {enableTracing: false, useHash: true}
    ),
    RouterApplicationModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
