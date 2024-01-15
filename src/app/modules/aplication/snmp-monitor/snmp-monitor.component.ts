import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { DeviceService } from '../../services/monitor-snmp/deviceSNMP/device.service';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/websockets/websocket.service';

@Component({
    selector: 'app-snmp-monitor',
    templateUrl: './snmp-monitor.component.html',
    styleUrls: ['./snmp-monitor.component.css']
})
export class SnmpMonitorComponent {
    layout: string = 'list';
    values!: any;
    items: MenuItem[] = [];
    stateOptions: any[] = [{ icon: 'pi pi-list', value: 'list' }, { label: '', icon: 'pi pi-th-large', value: 'grid' }];
    value: string = 'list';
    private router = inject(Router);

    //Modal
    public visible: boolean = false;
    public titleDialog!: string;
    public update: boolean = false;

    //Formularios
    public formulario!: FormGroup;
    private fb = inject(FormBuilder);

    //Avisos
    private messageService = inject(MessageService);

    //Servicios
    public devices: any[] = [];
    private deviceService = inject(DeviceService);
    private webSocketService = inject(WebSocketService);
    public message!: any;
    alert: Message[];

    constructor() {
        this.formulario = this.fb.group({
            ipDispositivo: ['', Validators.required],
            nombreDispositivo: ['', [Validators.required]],
            comunidad: ['', [Validators.required]]
        });

        this.alert = [
            { severity: 'error', summary: 'Error', detail: 'ALERTA' },
        ];
    }

    ngOnInit() {
        this.getDevices();
        this.lisenerMessage();
    }


    // Guardar un nuevo Dispositivo o Editar uno existente
    onSubmit() {
        if (this.formulario.valid) {
            let datosBody = {
                ipDispositivo: this.formulario.get('ipDispositivo')?.value,
                nombreDispositivo: this.formulario.get('nombreDispositivo')?.value,
                comunidad: this.formulario.get('comunidad')?.value,
            }
            if (!this.update) {
                this.deviceService.saveDevice(datosBody).subscribe({
                    next: () => {
                        this.visible = false;
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se guardo El Dispositivo' });
                    },
                    error: (error: any) => {
                        console.log("Error", error);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el Dispositivo' });
                    }
                });
            } else {
                this.deviceService.editDevice(datosBody).subscribe({
                    next: () => {
                        this.visible = false;
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se Edito El Dispositivo' });
                        this.update = false;
                    },
                    error: (error: any) => {
                        console.log("Error", error);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo editar el Dispositivo' });
                        this.update = false;
                    }
                });
            }
        } else {
            console.error("El valor de 'username' es nulo en localStorage.");
        }
    }

    // Obtener todos los Dispositivos SNMP Guardados
    getDevices() {
        this.deviceService.getDevices().subscribe({
            next: (data: any) => {
                if (data.metadata[0].codigo == "00") {
                    this.devices = data.snmpDeviceResponse.snmpdevices;
                }
            },
            error: (error: any) => {
                console.log("Error", error);
            }
        });
    }

    // Mostrar Modal con opciones de edicion 
    showUpdateDialog(ip: string, name: string, community: string) {
        this.update = true;
        this.showDialog('Editar Dispositivo');
        this.formulario.setValue({
            ipDispositivo: ip,
            nombreDispositivo: name, 
            comunidad: community
        });

        /*this.formulario = this.fb.group({
            ipDispositivo: [ip, Validators.required],
            nombreDispositivo: [name, [Validators.required]],
            comunidad: [community, [Validators.required]]
        });*/
    }

    // Eliminar dispositivo cargado
    deleteDevice(idDevice: number) {
        this.deviceService.deleteDevices(idDevice).subscribe({
            next: (data: any) => {
                if (data.metadata[0].codigo == "00") {
                    console.log(data);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se Elimino El Dispositivo' });
                    this.getDevices()
                }
            },
            error: (error: any) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo Eliminar el Dispositivo' });
                console.log("Error", error);
            }
        });
    }

    // Modal
    showDialog(title: string) {
        this.formulario = this.fb.group({
            ipDispositivo: ['', Validators.required],
            nombreDispositivo: ['', [Validators.required]],
            comunidad: ['', [Validators.required]]
        });
        this.update = false;
        this.visible = true;
        this.titleDialog = title;
    }

    // Ir a pantalla de tecnicos
    goToTechnicians(){
        this.router.navigate(['/app/tecnicos']);
    }

    // Cambiar tipo de vista
    changeLayout() {
        this.layout = this.value;
    }

    //Ir a la gestion SNMP del dispositivo
    snmpManagment(idDevice: number) {
        const parametro = {
            id: idDevice,
        };
        this.router.navigate(['/app/gestion-snmp'], { queryParams: parametro });
    }

    lisenerMessage() {
        this.webSocketService.subscribeToSnmpNotifications().subscribe((messages: any) => {
            console.log('Mensaje recibido del servidor:', messages)
            this.message = messages;
        });
    }

    isAlertRow(d: any): boolean {
        return this.message != null && this.message.idDevice == d.idDispositivo;
    }


}
