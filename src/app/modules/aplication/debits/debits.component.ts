import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { DebitsService } from '../../services/debits/debits.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debits',
  templateUrl: './debits.component.html',
  styleUrls: ['./debits.component.css']
})
export class DebitsComponent implements OnInit {
  uploadedFiles: any[] = [];
  public debitsCells: any[] = [];
  public responseCells: any[] = [];
  private messageService = inject(MessageService);
  public fileName: string = '';
  public date!: Date;
  public loading: boolean = false;
  public valueOpenClose: string = 'Abierto';
  public toggleTab1: boolean = true;
  private cdr = inject(ChangeDetectorRef);
  abiertosCerrados: any[] = [{ label: 'Abierto', value: 'Abierto' }, { label: 'Cerrado', value: 'Cerrado' }];
  private router = inject(Router);
  

  //Servicios
  private debitsService = inject(DebitsService);

  ngOnInit(): void {
    this.getAllCellsDebits();
    this.getAllCellsResponse();
  }

  //Cambiar vista entre Extractos y Respuestas
  changeTab(value: boolean) {
    this.toggleTab1 = value;
  }

  // Cargar archivo Excel a Procesar
  onUpload(event: FileUploadEvent) {
    this.loading = true;
    const formData = new FormData();
    if (event.files && event.files.length > 0) {
      formData.append('fileExcel', event.files[0]);
      console.log(event.files[0]);
      this.debitsService.uploadFile(formData).pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe({
        next: () => {
          this.getAllCellsDebits();
          this.messageService.add({ severity: 'info', summary: 'Archivo Cargado', detail: '' });
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'warn', summary: 'Error al cargar el archivo', detail: '' });
          console.log("Error", error);
        }
      });
    }
  }

  // Cargar archivo TXT con respuesta a Procesar
  onUploadTxt(event: FileUploadEvent) {
    this.loading = true;
    const formData = new FormData();

    if (event.files && event.files.length > 0) {
      formData.append('fileTxt', event.files[0]);
      console.log(event.files[0]);

      this.debitsService.uploadFileTxt(formData).pipe(
        finalize(() => {
          this.loading = false; // Muestra el Spinner mientras se este cargando
        })
      ).subscribe({
        next: () => {
          this.getAllCellsResponse();
          this.messageService.add({ severity: 'info', summary: 'Archivo Cargado', detail: '' });
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'warn', summary: 'Error al cargar el archivo', detail: '' });
          console.log("Error", error);
        }
      });
    }
  }

  // Descargar Extracto para el Banco
  dowloadXls() {
    this.loading = true;
    const formData = new FormData();
    formData.append('fileName', this.fileName);
    formData.append('debit', this.valueOpenClose);
    formData.append('date', this.formatDate(this.date));

    this.debitsService.downloadExtract(formData).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
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
        this.messageService.add({ severity: 'warn', summary: 'Error al descargar el archivo', detail: '' });
        console.log("Error", error);
      },
    });
  }

  // Descargar Respuesta procesada del Banco
  dowloadXlsResp() {
    this.loading = true;  
    this.debitsService.downloadResponse().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Respuesta Debitos.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.messageService.add({ severity: 'info', summary: 'Archivo Descargado', detail: '' });
        this.deleteAllCells();
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'warn', summary: 'Error al descargar el archivo', detail: '' });
        console.log("Error", error);
      },
    });
  }

  //Obtener todas las celdas que se guardaron con el archivo excel
  getAllCellsDebits() {
    this.debitsService.getAll().subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.debitsCells = data.debitosAutomaticosResponse.debitosAutomaticos;
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  //Obtener todas las celdas que se guardaron con el archivo excel
  getAllCellsResponse() {
    this.debitsService.getAllResp().subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.responseCells = data.respuestaDebitosResponse.respuestaDebitos;
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }


  // Eliminar todas las celdas guardadas
  deleteAllCells() {
    if (this.toggleTab1) {
      this.debitsService.deleteAll().subscribe();
    } else {
      this.debitsService.deleteAllResp().subscribe();
    }
    this.cdr.detectChanges();
  }

  // Metodo para formatear fecha segun corresponde en el archivo
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }

}
