import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppCommonsComponent } from "./app-commons/app-commons.component";
import { HomeComponent } from "./home/home.component";
import { HomebankingComponent } from "./homebanking/homebanking.component";
import { SnmpMonitorComponent } from "./snmp-monitor/snmp-monitor.component";
import { HostMonitorComponent } from "./host-monitor/hostmonitor.component";
import { DebitsComponent } from "./debits/debits.component";
import { LogsComponent } from "./host-monitor/logs/logs.component";

const constRutasHijas: Routes = [
    { path: 'app', component: AppCommonsComponent},
    { path: 'home', component: HomeComponent},
    { path: 'homebanking', component: HomebankingComponent},
    { path: 'debitos', component: DebitsComponent},
    { path: 'monitoreo-ping', component: HostMonitorComponent},
    { path: 'monitoreo-snmp', component: SnmpMonitorComponent},
    { path: 'log', component: LogsComponent},
  ]
  
  @NgModule({
    imports: [RouterModule.forChild(constRutasHijas)],
    exports: [RouterModule],
  })
  export class RouterChildModule { }