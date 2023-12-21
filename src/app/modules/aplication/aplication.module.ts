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
import { HostMonitorComponent } from './host-monitor/hostmonitor.component';
import { DeviceComponent } from './snmp-monitor/components/device/device.component';
import { LogsComponent } from './host-monitor/logs/logs.component';

@NgModule({
  declarations: [
    AppCommonsComponent,
    HomeComponent,
    HomebankingComponent,
    DebitsComponent,
    SnmpMonitorComponent,
    HostMonitorComponent,
    DeviceComponent,
    LogsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgPrimeModule,
    TemplateModule
  ]
})
export class AplicationModule { }
