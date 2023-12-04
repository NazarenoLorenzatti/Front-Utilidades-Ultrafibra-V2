import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppCommonsComponent } from './app-commons/app-commons.component';

const rutas: Routes = [
    {
        path: 'app',
        component: AppCommonsComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    },
    {
        path: 'home',
        component: HomeComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    }
]

@NgModule({
    imports: [RouterModule.forChild(rutas)],
    exports: [RouterModule]
})
export class RouterApplicationModule { }