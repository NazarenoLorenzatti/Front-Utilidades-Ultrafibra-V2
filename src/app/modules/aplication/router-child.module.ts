import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppCommonsComponent } from "./app-commons/app-commons.component";
import { HomeComponent } from "./home/home.component";
import { HomebankingComponent } from "./homebanking/homebanking.component";
import { SnmpMonitorComponent } from "./snmp-monitor/snmp-monitor.component";
import { EventsComponent } from "./events/events.component";
import { DebitsComponent } from "./debits/debits.component";

const constRutasHijas: Routes = [
    { path: 'app', component: AppCommonsComponent},
    { path: 'home', component: HomeComponent},
    { path: 'homebanking', component: HomebankingComponent},
    { path: 'debitos', component: DebitsComponent},
    { path: 'eventos', component: EventsComponent},
    { path: 'monitoreo-snmp', component: SnmpMonitorComponent},
  ]
  
  @NgModule({
    imports: [RouterModule.forChild(constRutasHijas)],
    exports: [RouterModule],
  })
  export class RouterChildModule { }