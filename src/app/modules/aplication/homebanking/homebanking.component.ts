import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { HomebankingService } from '../../services/homebanking/homebankingservice.service';
import { BanelcoModel } from '../../templates/models/banelco.model';
import { HttpResponse } from '@angular/common/http';
import * as saveAs from 'file-saver';

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
  public fileName: string = '';
  cols!: Column[];
  exportColumns!: ExportColumn[];
  banelcoCels!: BanelcoModel[];
  cels!: any[];
  private cdr = inject(ChangeDetectorRef);

  // SERVICIOS
  private homebankingService = inject(HomebankingService);
  private messageService = inject(MessageService);

  constructor() { }

  ngOnInit() {
    this.getAllCells();
  }

  //Subir archivo Excel
  onUpload(event: FileUploadEvent) {
    const formData = new FormData();
    if (event.files && event.files.length > 0) {
      formData.append('fileExcel', event.files[0]);
      console.log(event.files[0]);
      this.homebankingService.uploadFile(formData).subscribe({
        next: () => {
          this.getAllCells();
          this.messageService.add({ severity: 'info', summary: 'Archivo Cargado', detail: '' });
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'warn', summary: 'Error al cargar el archivo', detail: '' });
          console.log("Error", error);
        }

      });
    }
  }

  //Obtener todas las celdas que se guardaron con el archivo excel
  getAllCells() {
    this.homebankingService.getAll().subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.banelcoCels = data.baseBanelcoResponse.baseBanelco;
          //this.cels = data.baseBanelcoResponse.baseBanelco;
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  // Descargar archivo txt
  donwloadTxt() {
    if (this.fileName.match("PGK0")) {
      alert("LINK");
      // Descargar el archivo de Link
      this.homebankingService.downloadTxtLink(this.fileName).subscribe({
        next: (data: any) => {
          console.log(" ARCHIVOS DE LINK ", data);
          this.saveZip(data);
          this.messageService.add({ severity: 'info', summary: 'Archivos descargados', detail: '' });
          this.cels = [];
          this.deleteAllCells();          
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'warn', summary: 'Error al descargar el archivo', detail: '' });
          console.log("Error", error);
        }
      });
    } else {
      alert("BANELCO");
      //Descargar el archivo de Banelco
      this.homebankingService.downloadTxtBanelco(this.fileName).subscribe({
        next: (data: any) => {
          const blob = new Blob([data], { type: 'text/plain' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = this.fileName;
          document.body.appendChild(link);
          link.click();

          // Elimina el enlace después de la descarga
          document.body.removeChild(link);

          this.messageService.add({ severity: 'info', summary: 'Archivo descargado', detail: '' });
          this.deleteAllCells();
          this.cels = [];
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'warn', summary: 'Error al descargar el archivo', detail: '' });
          console.log("Error", error);
        }
      });
    }
  }

  deleteAllCells() {
    this.homebankingService.deleteAll().subscribe();
    this.cdr.detectChanges();
  }


  private saveZip(response: HttpResponse<ArrayBuffer>): void {
    console.log('Contenido de la respuesta:', response.body);
    const contentType = response.headers.get('content-type');
    console.log('Encabezados de la respuesta:', response.headers.keys());

    if (contentType && contentType.toLowerCase() === 'application/octet-stream') {
      // Verificación de nulidad para response.body
      const blob = response.body
        ? new Blob([response.body], { type: 'application/zip' })
        : null;
      console.log("BLOB", blob);
      if (blob) {
        const filename = 'archivos_combinados.zip';
        // Guardar el archivo ZIP
        saveAs(blob, filename);
      } else {
        console.error('El cuerpo de la respuesta es nulo.');
      }
    } else {
      console.error('El encabezado "content-disposition" es nulo o no tiene el formato esperado.');
    }
  }

}
