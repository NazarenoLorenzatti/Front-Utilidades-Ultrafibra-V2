import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppCommonsComponent } from "./app-commons/app-commons.component";
import { HomeComponent } from "./home/home.component";
import { HomebankingComponent } from "./homebanking/homebanking.component";
import { SnmpMonitorComponent } from "./snmp-monitor/snmp-monitor.component";
import { HostMonitorComponent } from "./host-monitor/hostmonitor.component";
import { DebitsComponent } from "./debits/debits.component";
import { LogsComponent } from "./host-monitor/logs/logs.component";
import { DeviceComponent } from "./snmp-monitor/components/device/device.component";
import { ProfileComponent } from "./profile/profile.component";
import { TechniciansComponent } from "./technicians/technicians.component";
import { AuthGuard } from "src/app/AuthGuard";


const constRutasHijas: Routes = [
    { path: 'app', component: AppCommonsComponent, canActivate: [AuthGuard]},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'homebanking', component: HomebankingComponent, canActivate: [AuthGuard]},
    { path: 'debitos', component: DebitsComponent, canActivate: [AuthGuard]},
    { path: 'monitoreo-ping', component: HostMonitorComponent, canActivate: [AuthGuard]},
    { path: 'monitoreo-snmp', component: SnmpMonitorComponent, canActivate: [AuthGuard]},
    { path: 'log', component: LogsComponent, canActivate: [AuthGuard]},
    { path: 'gestion-snmp', component: DeviceComponent, canActivate: [AuthGuard]},
    { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'tecnicos', component: TechniciansComponent, canActivate: [AuthGuard]},
  ]
  
  @NgModule({
    imports: [RouterModule.forChild(constRutasHijas)],
    exports: [RouterModule],
  })
  export class RouterChildModule { }