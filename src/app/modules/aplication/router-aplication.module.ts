import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppCommonsComponent } from './app-commons/app-commons.component';
import { HomebankingComponent } from './homebanking/homebanking.component';
import { DebitsComponent } from './debits/debits.component';
import { HostMonitorComponent } from './host-monitor/hostmonitor.component';
import { SnmpMonitorComponent } from './snmp-monitor/snmp-monitor.component';
import { LogsComponent } from './host-monitor/logs/logs.component';
import { ProfileComponent } from './profile/profile.component';
import { TechniciansComponent } from './technicians/technicians.component';
import { AuthGuard } from 'src/app/AuthGuard';


const rutas: Routes = [
    {
        path: 'app',
        component: AppCommonsComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'homebanking',
        component: HomebankingComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'debitos',
        component: DebitsComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'monitoreo-ping',
        component: HostMonitorComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'monitoreo-snmp',
        component: SnmpMonitorComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'log',
        component: LogsComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'perfil',
        component: ProfileComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'tecnicos',
        component: TechniciansComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
        canActivate: [AuthGuard]
    }
    
]

@NgModule({
    imports: [RouterModule.forChild(rutas)],
    exports: [RouterModule]
})
export class RouterApplicationModule { }