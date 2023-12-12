import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [],
  providers: [MessageService],
  exports: [
    ButtonModule,
    FileUploadModule,
    ToastModule,
    InputTextModule,
    TableModule,
    TabViewModule,
    SelectButtonModule,
    CalendarModule,
    ChartModule
  ],
  imports: [
    ButtonModule,
    FileUploadModule,
    CommonModule,
    ToastModule,
    InputTextModule,
    TableModule,
    TabViewModule,
    SelectButtonModule,
    CalendarModule,
    ChartModule
  ]
})
export class NgPrimeModule { }
