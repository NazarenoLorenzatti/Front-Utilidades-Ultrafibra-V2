import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { LoginCommonsComponent } from './login-commons/login-commons.component';
import { SignupComponent } from './new-user/components/signup/signup.component';
import { PersonalInfoComponent } from './new-user/components/personal-info/personal-info.component';
import { ConfirmationInfoComponent } from './new-user/components/confirmation-info/confirmation-info.component';

const rutas: Routes = [
    {
        path: '',
        component: LoginCommonsComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    },
    {
        path: 'signin',
        component: LoginCommonsComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    },
    {
        path: 'login',
        component: LoginComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    },
    {
        path: 'guardar-usuario',
        component: NewUserComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    },
    {
        path: 'signup',
        component: SignupComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    },
    {
        path: 'info',
        component: PersonalInfoComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    },
    {
        path: 'confirmar',
        component: ConfirmationInfoComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    }
    
]

@NgModule({
    imports: [RouterModule.forChild(rutas)],
    exports: [RouterModule]
})
export class RouterLoginModule { }