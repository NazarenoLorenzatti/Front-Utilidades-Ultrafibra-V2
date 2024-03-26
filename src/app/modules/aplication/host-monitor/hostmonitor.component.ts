import { Component, HostListener, OnInit, inject } from '@angular/core';
import { HostsService } from '../../services/monitoreo-ping/hosts/hosts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import 'chartjs-plugin-zoom';
import { LogService } from '../../services/monitoreo-ping/logs/log.service';
import { Observable, map } from 'rxjs';
import { WebSocketService } from '../../services/websockets/websocket.service';
import { forEach } from 'jszip';

const documentStyle = getComputedStyle(document.documentElement);

@Component({
    selector: 'app-events',
    templateUrl: './hostmonitor.component.html',
    styleUrls: ['./hostmonitor.component.css']
})
export class HostMonitorComponent implements OnInit {

    private router = inject(Router);
    public isPhone: boolean = false;
    public hoursMonth$!: Observable<number>;

    //Formulario Modal
    public visible: boolean = false;
    public formulario!: FormGroup;
    private fb = inject(FormBuilder);
    private messageService = inject(MessageService);
    public messages: any[] = [];
    public racheable: boolean = false;

    // SERVICIOS
    private hostService = inject(HostsService);
    private webSocketService = inject(WebSocketService);

    // Atributos Locales
    public hosts!: any[];
    public options: any;
    public horaEncendido: string = "";
    public messageNoHost!: any[];

    constructor() {
        this.formulario = this.fb.group({
            nombreHost: ['', Validators.required],
            ipHost: ['', [Validators.required]],
        });
        this.messageNoHost = [
            { severity: 'warn', summary: 'Alerta', detail: 'No hay Hosts Cargados' },
        ];
    }

    // Metodos
    ngOnInit() {
        this.getHosts();

        // Recuperar mensajes almacenados en localStorage si existen
        const storedMessages = localStorage.getItem('messages');
        if (storedMessages) {
            this.messages = JSON.parse(storedMessages);
        }

        this.lisenerMessage();
    }

    //Envio del Formulario
    onSubmit() {
        if (this.formulario.valid) {
            let datosBody = {
                nombreHost: this.formulario.get('nombreHost')?.value,
                ipHost: this.formulario.get('ipHost')?.value,
            }
            this.hostService.saveHost(datosBody).subscribe({
                next: () => {
                    this.showSuccess();
                    this.visible = false;
                    this.getHosts();
                },
                error: (error: any) => {
                    console.log("Error", error);
                    this.showError();
                }
            });
        } else {
            console.error("El valor de 'username' es nulo en localStorage.");
        }
    }

    // Obtener todos los hosts
    getHosts() {
        this.hostService.getHosts().subscribe({
            next: (data: any) => {
                if (data.metadata[0].codigo == "00") {
                    this.hosts = data.hostResponse.hosts;
                    this.hosts.forEach((host: any) => {
                        this.hostService.newPing(host).subscribe();
                    });
                }
            },
            error: (error: any) => {
                console.log("Error", error);
                this.messageNoHost = [
                    { severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los hosts' },
                ];
            }
        });
    }

    // Eliminar Host
    deleteHost(idHost: any) {
        this.hostService.deleteHost(idHost).subscribe({
            next: () => {
                this.getHosts();
            },
            error: (error: any) => {
                console.log("Error", error);
            }
        });
    }

    // Obtener Horas de funcionamiento del generador
    getTotalTiempoUso(host: any): number {
        let hoursMonth = 0;
        host.logs.forEach((l: { diferenciaEnHoras: number; }) => {
            if (l.diferenciaEnHoras) {
                hoursMonth += l.diferenciaEnHoras;
            } else {
                hoursMonth;
            }
        });
        return hoursMonth;
    }

    // Escuchar mensajes del Socket
    lisenerMessage() {
        this.webSocketService.subscribeToPingNotifications().subscribe((message: any) => {
            const index = this.messages.findIndex((m) => m.idHost === message.idHost);
            if (index !== -1) {
                this.messages[index] = message;
            } else {
                this.messages.push(message);
            }
            localStorage.setItem('messages', JSON.stringify(this.messages));
        });
    }

    // El ping es Correcto?
    isOn(host: any): boolean {
        if(this.horaEncendido === ''){
            this.obtenerHoraActual();
        }        
        const latestMessage = this.messages.find((m) => m.idHost === host.idHost);
        if(!host && latestMessage?.alcanzable && host.idHost === latestMessage?.idHost){
            this.horaEncendido = ''
        }
        return host && latestMessage?.alcanzable && host.idHost === latestMessage?.idHost;
    }

    // Mostrar Modal
    showDialog() {
        this.visible = true;
    }

    showDialogEdit(host: any) {
        this.formulario = this.fb.group({
            nombreHost: [host.nombreHost, Validators.required],
            ipHost: [host.ipHost, [Validators.required]],
        });
        this.visible = true;
    }

    //Ir a Logs
    viewLog(idHost: number) {
        this.router.navigate(['/app/log'], {
            queryParams: { idHost: idHost }
        });
    }

    // Ir a pantalla de tecnicos
    goToTechnicians() {
        this.router.navigate(['/app/tecnicos']);
    }

    // Mensaje Ok
    showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se guardo El Host' });
    }

    // Mensaje Error
    showError() {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el Host' });
    }

    // Escuchar los eventos al cambiar el tamanio de pantalla
    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.checkScreenSize();
    }

    // Función para verificar el tamaño de la pantalla y ajustar la clase en consecuencia
    checkScreenSize(): void {
        this.isPhone = window.innerWidth < 768;
    }

    // Función para actualizar el tiempo encendido
    obtenerHoraActual() {
        let ahora = new Date();
        const horas = ahora.getHours().toString().padStart(2, '0'); // Obtiene las horas y asegura que tenga dos dígitos
        const minutos = ahora.getMinutes().toString().padStart(2, '0'); // Obtiene los minutos y asegura que tenga dos dígitos
        const segundos = ahora.getSeconds().toString().padStart(2, '0'); // Obtiene los segundos y asegura que tenga dos dígitos
        this.horaEncendido = `${horas}:${minutos}:${segundos}`; // Formatea la hora
    }

}
