import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppCommonsComponent } from './app-commons/app-commons.component';
import { HomebankingComponent } from './homebanking/homebanking.component';
import { DebitsComponent } from './debits/debits.component';
import { EventsComponent } from './events/events.component';
import { SnmpMonitorComponent } from './snmp-monitor/snmp-monitor.component';

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
    },
    {
        path: 'homebanking',
        component: HomebankingComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    },
    {
        path: 'debitos',
        component: DebitsComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    },
    {
        path: 'eventos',
        component: EventsComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    },
    {
        path: 'monitoreo-snmp',
        component: SnmpMonitorComponent,
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    }
]

@NgModule({
    imports: [RouterModule.forChild(rutas)],
    exports: [RouterModule]
})
export class RouterApplicationModule { }