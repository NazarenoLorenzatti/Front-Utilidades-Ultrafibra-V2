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
  public uploadedFiles: any[] = [];
  public fileName: string = '';
  public loading: boolean = false;
  public cols!: Column[];
  public exportColumns!: ExportColumn[];
  public banelcoCels!: BanelcoModel[];
  public cels!: any[];
  private cdr = inject(ChangeDetectorRef);

  // SERVICIOS
  private homebankingService = inject(HomebankingService);
  private messageService = inject(MessageService);

  constructor() { }

  ngOnInit() {
    console.log(this.banelcoCels)
    this.getAllCells();
  }

  //Subir archivo Excel
  onUpload(event: FileUploadEvent) {
    this.loading = true;
    const formData = new FormData();
    if (event.files && event.files.length > 0) {
      formData.append('fileExcel', event.files[0]);
      this.homebankingService.uploadFile(formData).subscribe({
        next: () => {
          this.getAllCells();
          this.showSuccess("Archivo Cargado");
          this.loading = false;
        },
        error: (error: any) => {
          this.showError("Error al cargar el archivo");
          console.log("Error", error);
          this.loading = false;
        }
      });
    } 
  }

  //Subir archivo Excel de respuesta Macroclick
  onUploadResponse(event: FileUploadEvent) {
    this.loading = true;
    const formData = new FormData();
    if (event.files && event.files.length > 0) {
      formData.append('fileExcel', event.files[0]);
      this.homebankingService.uploadFileResponse(formData).subscribe({
        next: () => {
          this.getAllCells();
          this.showSuccess("Archivo Cargado");
          this.loading = false;
        },
        error: (error: any) => {
          this.showError("Error al cargar el archivo");
          console.log("Error", error);
          this.loading = false;
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
          console.log( this.banelcoCels )
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  // Descargar archivo txt
  donwloadTxt() {
    this.loading = true;
    if (this.fileName.match("PGK0")) {
      // Descargar el archivo de Link
      this.homebankingService.downloadTxtLink(this.fileName).subscribe({
        next: (data: any) => {
          this.saveZip(data);
          this.loading = false;
          this.showSuccess("Archivo TXT de LINK descargado");
          this.cels = [];
          this.deleteAllCells();
        },
        error: (error: any) => {
          this.loading = false;
          this.showError("Error al descargar el archivo TXT de LINK  --- REVISE EL ARCHIVO EXCEL");
          this.deleteAllCells();
          console.log("Error", error);
        }
      });
    } else {
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
          this.loading = false;
          this.showSuccess("Archivo TXT de Banelco descargado");
          this.deleteAllCells();
          this.cels = [];
        },
        error: (error: any) => {
          this.loading = false;
          this.showError("Error al descargar el archivo TXT de Banelco  --- REVISE EL ARCHIVO EXCEL");
          this.deleteAllCells();
          console.log("Error", error);
        }
      });
    }
  }

  // Descargar archivo txt
  donwloadXls() {
    this.loading = true;
    // Descargar el archivo del servicio
    this.homebankingService.downloadXls(this.fileName).subscribe({
      next: (data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = this.fileName + '.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.messageService.add({ severity: 'info', summary: 'Archivo Cargado', detail: '' });
        this.deleteAllCells();
      },
      error: (error: any) => {
        this.loading = false;
        this.showError("Error al descargar el archivo CSV");
        console.log("Error", error);
      }
    });
  }

  deleteAllCells() {
    this.loading = true;
    this.homebankingService.deleteAll().subscribe({
      next: () => {
        this.loading = false;
        this.showSuccess("Celdas Limpias");
        this.getAllCells();
      },
      error: (error: any) => {
        this.loading = false;
        this.showError("Error al borrar las celdas");
        console.log("Error", error);
        this.getAllCells();
      }
    });

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


  showSuccess(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Ok', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
