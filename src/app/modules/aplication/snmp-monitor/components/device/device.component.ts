import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/modules/services/monitor-snmp/deviceSNMP/device.service';
import { ConfirmationService, MessageService, ConfirmEventType, SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OidService } from 'src/app/modules/services/monitor-snmp/Oid/oid.service';
import { VariableOidService } from 'src/app/modules/services/monitor-snmp/Oid/variable-oid.service';
import { EventsService } from 'src/app/modules/services/monitor-snmp/Events/events.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  prioridadOptions: SelectItem[] = [
    { label: 'LOW', value: 'LOW' },
    { label: 'WARN', value: 'WARN' },
    { label: 'DANGER', value: 'DANGER' },
  ];

  public viewNewOidModal: boolean = false;
  public viewNewVariableModal: boolean = false;
  public formNewOid!: FormGroup;
  public formVariable!: FormGroup;
  public formTest!: FormGroup;
  public formEditVariable!: FormGroup;
  private fb = inject(FormBuilder);
  private idDevice: number = 0;
  public editVar: boolean = false;
  public tituloModal!: string;


  // Servicios
  private deviceService = inject(DeviceService);
  private oidService = inject(OidService);
  private variableService = inject(VariableOidService);
  private eventsService = inject(EventsService);
  public deviceSnmp!: any;
  public oids: any[] = [];
  public events: any[] = [];
  public totalEventsCount!: number;

  // Servicios ANgular y PrimeNg
  private route = inject(ActivatedRoute);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  public idOid!: number;

  constructor() {

    //Formulario OID
    this.formNewOid = this.fb.group({
      oid: ['', Validators.required],
      eventOid: ['', [Validators.required]],
    });

    //Formulario Test SNMP
    this.formTest = this.fb.group({
      telephone: ['', Validators.required],
      email: ['', [Validators.required]],
    });

    //Formulario Variable
    this.formVariable = this.fb.group({
      valueVariable: ['', Validators.required],
      syntaxVariable: ['', [Validators.required]],
      prioridadVariable: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // Se recibe el ID del Dispositivo
    this.route.queryParams.subscribe(params => {
      this.idDevice = params['id'];
    });
    this.getDevice(this.idDevice);

  }

  // Obtener el dispositivo que se selecciono
  getDevice(id: number) {
    this.deviceService.findDevice(id).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.deviceSnmp = data.snmpDeviceResponse.snmpdevices[0];
          this.oids = data.snmpDeviceResponse.snmpdevices[0].oids;
          this.events = data.snmpDeviceResponse.snmpdevices[0].eventos;
          this.totalEventsCount = this.events.length;
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  // Formulario para la creacion de un nuevo OID
  onSubmitNewModal() {
    if (this.formNewOid.valid) {
      let datosBody = {
        oid: this.formNewOid.get('oid')?.value,
        evento: this.formNewOid.get('eventOid')?.value,
        snmpDevice: {
          idDispositivo: this.idDevice
        }
      }
      this.oidService.saveOid(datosBody).subscribe({
        next: () => {
          this.showSuccess("Nuevo OID guardado")
          this.viewNewOidModal = false;
          this.getDevice(this.idDevice);
        },
        error: (error: any) => {
          console.log("Error", error);
          this.showError("Ocurrio un Error al intentar guardar el OID");
        }
      });
    }
  }

  // Formulario para la creacion de una nueva variable
  onSubmitVariableModal(edit: boolean) {
    if (this.formVariable.valid) {
      let datosBody = {
        valorVariable: this.formVariable.get('valueVariable')?.value,
        sintaxisVariable: this.formVariable.get('syntaxVariable')?.value,
        prioridad: this.formVariable.get('prioridadVariable')?.value,
        oid: {
          idOid: this.idOid
        }
      }

      if (!edit) {  // GUARDAR NUEVA VARIABLE
        this.variableService.saveVariable(datosBody).subscribe({
          next: () => {
            this.showSuccess("Variable Guardada")
            this.viewNewVariableModal = false;
            this.getDevice(this.idDevice);
          },
          error: (error: any) => {
            console.log("Error", error);
            this.showError("Ocurrio un Error al intentar guardar la nueva Variable");
          }
        });
      } else { // EDITAR VARIABLE
        this.variableService.editVariable(datosBody).subscribe({
          next: () => {
            this.showSuccess("Variable Editada")
            this.viewNewVariableModal = false;
            this.editVar = false;
            this.tituloModal = "Nueva Variable";
            this.getDevice(this.idDevice);
          },
          error: (error: any) => {
            console.log("Error", error);
            this.showError("Ocurrio un Error al intentar Editar la variable");
          }
        });
      }
    }
  }

  // Confirmacion de Delete
  confirmDialog(id: number, element: string) {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar?',
      header: 'Confirmar Eliminar',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        if (element === "variable") {
          this.deleteVariable(id);
        } else if (element === "oid") {
          this.deleteOid(id);
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Operacion Cancelada', detail: 'Operacion Cancelada' });
      }
    });
  }

  // Eliminar OID
  deleteOid(idOid: number) {
    this.oidService.deleteOid(idOid).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.showSuccess("Oid Eliminado")
          this.getDevice(this.idDevice);
        }
      },
      error: () => {
        this.showError("Ocurrio un Error al intentar eliminar el OID");
      }
    });
  }

  // Eliminar Variable del OID
  deleteVariable(idVariable: number) {
    this.variableService.deleteVariable(idVariable).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.showSuccess("Variable Eliminada")
        }
        this.getDevice(this.idDevice);
      },
      error: () => {
        this.showError("Ocurrio un Error al intentar eliminar la variable");
      }
    });
  }

  //Formulario de Edicion de Variable
  editVariable(variable: any, oid: any) {
    this.editVar = true;
    this.tituloModal = "EDITAR VARIABLE";
    this.formVariable.setValue({
      valueVariable: variable.valorVariable,
      syntaxVariable: variable.sintaxisVariable,
      prioridadVariable: variable.prioridad, // o el valor que desees establecer
    });
    this.showNewVariableModal(oid.idOid);
  }

  // Obtener el color de la Etiqueta
  getSeverity(event: string) {
    switch (event.toLowerCase()) {
      case 'low':
        return 'success';
      case 'warn':
        return 'warn';
      case 'danger':
        return 'danger';
      default:
        return 'success';
    }
  }

  // Limpiar todo el Log
  clearLogs(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Quiere eliminar todos los eventos?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.eventsService.deleteEvents(this.deviceSnmp).subscribe({
          next: (data: any) => {
            if (data.metadata[0].codigo == "00") {
              console.log(this.deviceSnmp)
              this.showSuccess("Logs Vaciados")
            }
            this.getDevice(this.idDevice);
          },
          error: () => {
            this.showError("Ocurrio un Error al intentar vaciar los registros");
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Cancelado', life: 3000 });
      }
    });
  }

  deleteLog(idLog: number) {
    this.eventsService.deleteEvent(idLog).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.showSuccess("Log Eliminado")
        }
        this.getDevice(this.idDevice);
      },
      error: () => {
        this.showError("Ocurrio un Error al intentar eliminar el registro");
      }
    });
  }

  showNewOidModal() {
    this.viewNewOidModal = true;
  }

  showNewVariableModal(idOid: number) {
    this.idOid = idOid;
    this.viewNewVariableModal = true;
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Ok', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  onSubmitTest(oidSolicitud: string, ipDispositivo: string) {   
    const formData = new FormData();
    formData.append('telefono', this.formTest.get('telephone')?.value);
    formData.append('email', this.formTest.get('email')?.value);
    formData.append('oid', oidSolicitud);
    formData.append('ip', ipDispositivo);
    console.log(this.formTest.get('telephone')?.value)
    this.consultaSNMP(formData);
  }

  // Hacer una consulta SNMP de prueba para testear conexion
  consultaSNMP(formData: FormData) {
    this.deviceService.getSnmp(formData).subscribe({
      next: (data: any) => {
        console.log(data)
        if (data.metadata[0].codigo == "00") {
          console.log(data);
        }
        this.getDevice(this.idDevice);
      },
      error: () => {
        this.showError("Ocurrio un Error al realizar la prueba");
      }
    });
  }

}
