import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}


@Component({
  selector: 'app-homebanking',
  templateUrl: './homebanking.component.html',
  styleUrls: ['./homebanking.component.css']
})
export class HomebankingComponent {
  uploadedFiles: any[] = [];
  value: string | undefined;
  cols!: Column[];
  exportColumns!: ExportColumn[];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    //this.productService.getProductsMini().then((data) => {
    //    this.products = data;
    //});

    this.cols = [
        { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
}

  onUpload(event:FileUploadEvent) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }

      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
}
