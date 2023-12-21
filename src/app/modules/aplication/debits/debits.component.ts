import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-debits',
  templateUrl: './debits.component.html',
  styleUrls: ['./debits.component.css']
})
export class DebitsComponent {
  uploadedFiles: any[] = [];
  values: any[] = [];
  private messageService = inject(MessageService);
  value: string | undefined;
  date: Date | undefined;
  loading: boolean = false;
  valueOpenClose: string = 'Abierto';
  toggleTab1: boolean = true;

  abiertosCerrados: any[] = [{label: 'Abier.', value: 'abierto'}, {label: 'Cerr.', value: 'cerrado'}];

  changeTab(value: boolean){
    this.toggleTab1 = value;
  }

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }

  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
}
