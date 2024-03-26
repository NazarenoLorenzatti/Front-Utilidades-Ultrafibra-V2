import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { DataViewModule } from 'primeng/dataview';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DatePipe } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { KnobModule } from 'primeng/knob';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  providers: [
    DatePipe ,
    MessageService,
    ConfirmationService,
  ],
  exports: [
    ButtonModule,
    FileUploadModule,
    ToastModule,
    InputTextModule,
    TableModule,
    TabViewModule,
    SelectButtonModule,
    CalendarModule,
    ChartModule,
    DataViewModule,
    SpeedDialModule,
    DialogModule,
    FormsModule, 
    ReactiveFormsModule,
    TagModule,
    CardModule,
    SplitButtonModule,
    ConfirmDialogModule,
    DropdownModule,
    ConfirmPopupModule,
    OverlayPanelModule,
    StepsModule,
    KnobModule,
    ProgressSpinnerModule
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
    ChartModule,
    DataViewModule,
    SpeedDialModule,
    DialogModule,
    FormsModule, 
    ReactiveFormsModule,
    TagModule,
    CardModule,
    SplitButtonModule,
    ConfirmDialogModule,
    DropdownModule,
    ConfirmPopupModule,
    OverlayPanelModule,
    StepsModule,
    KnobModule,
    ProgressSpinnerModule
  ]
})
export class NgPrimeModule { }
