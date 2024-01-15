import { Component, OnInit, inject } from '@angular/core';
import { TechniciansService } from '../../services/technicians/technicians.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent implements OnInit {

  // Servicios
  private technicianService = inject(TechniciansService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  //Formularios
  public form!: FormGroup;
  private fb = inject(FormBuilder);
  public visible: boolean = false;


  public technicians!: any[];

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      tel: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getTechnician();
  }


  onSubmit() {
    let datosBody = {
      nombreTecnico: this.form.get('name')?.value,
      telefono: this.form.get('tel')?.value,
      email: this.form.get('email')?.value,
    }
    this.saveTechnician(datosBody);
  }

  getTechnician() {
    this.technicianService.getTechnicians().subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.technicians = data.tecnicoResponse.tecnicos;
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  // Guardar nuevo Tecnico
  saveTechnician(body: any) {
    this.technicianService.saveTechnician(body).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.technicians = data.tecnicoResponse.tecnicos;
          this.visible = false;
          this.showSuccess("Tecnico Guardado")
          this.getTechnician();
        }
      },
      error: (error: any) => {
        this.visible = false;
        this.showError("No se pudo guardar el tecnico")
      }
    });
  }

  //Eliminar Tecnico
  deleteTechnician(idTecnico: number) {
    this.technicianService.deleteTechnician(idTecnico).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.showSuccess("Tecnico Eliminado");
          this.getTechnician();
        }
      },
      error: (error: any) => {
        this.showError("No se pudo guardar el tecnico");
      }
    });
  }

  //COnfirmar eliminar Tecnico
  confirmDelete(event: Event, idTecnico: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.deleteTechnician(idTecnico);
        this.getTechnician();
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: 'Accion Cancelada', life: 3000 });
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Ok', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
