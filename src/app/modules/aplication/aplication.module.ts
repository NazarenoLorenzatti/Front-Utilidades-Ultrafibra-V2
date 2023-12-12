import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonsComponent } from './app-commons/app-commons.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../templates/material.module';
import { NgPrimeModule } from '../templates/ng-prime.module';
import { TemplateModule } from '../templates/template.module';
import { HomebankingComponent } from './homebanking/homebanking.component';
import { DebitsComponent } from './debits/debits.component';
import { SnmpMonitorComponent } from './snmp-monitor/snmp-monitor.component';
import { EventsComponent } from './events/events.component';



@NgModule({
  declarations: [
    AppCommonsComponent,
    HomeComponent,
    HomebankingComponent,
    DebitsComponent,
    SnmpMonitorComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgPrimeModule,
    TemplateModule
  ]
})
export class AplicationModule { }
