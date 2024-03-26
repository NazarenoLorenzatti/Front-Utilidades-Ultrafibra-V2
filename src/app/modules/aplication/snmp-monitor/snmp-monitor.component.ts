import { Component, OnInit, inject } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { DeviceService } from '../../services/monitor-snmp/deviceSNMP/device.service';
import { WebSocketService } from '../../services/websockets/websocket.service';
import { DatePipe } from '@angular/common';
//import { EventsService } from '../../services/monitor-snmp/Events/events.service';
import { HostsService } from '../../services/monitoreo-ping/hosts/hosts.service';
import { interval } from 'rxjs';

interface SnmpMessage {
    device: string;
    dateAlert: string;
    idDevice: number;
    batteryStatus: string;
    outputStatus: string;
    batteryCharge: number;
    temp: number;
    timeCharge: number;
    input1: number;
    input2: number;
    input3: number;
    output1: number;
    output2: number;
    output3: number;
    bypass1: number;
    bypass2: number;
    bypass3: number;
}

export interface SnmpDeviceData {
    idDevice: number;
    snmpMessages: SnmpMessage;
    dataChartInputs: any;
    dataChartBypass: any;
}
@Component({
    selector: 'app-snmp-monitor',
    templateUrl: './snmp-monitor.component.html',
    styleUrls: ['./snmp-monitor.component.css']
})
export class SnmpMonitorComponent implements OnInit {

    // GRAFICOS DE LINEAS
    private datePipe = inject(DatePipe);
    public optionsChart: any;

    //Modal
    public visible: boolean = false;
    public titleDialog!: string;
    public update: boolean = false;

    //Formularios
    public idDevice!: number;
    public deviceName!: string;
    public deviceIp!: string;
    public deviceCommunity!: string;
    public selectedHost: any;
    public hosts: any[] = [];

    //Avisos
    private messageService = inject(MessageService);

    //Servicios
    public devices: any[] = [];
    private confirmationService = inject(ConfirmationService);
    private deviceService = inject(DeviceService);
    private hostService = inject(HostsService);
    private webSocketService = inject(WebSocketService);
    public snmpDeviceData: SnmpDeviceData[] = [];
    public messagesHost: any[] = [];
    public alert: Message[];

    constructor() {
        this.alert = [
            { severity: 'error', summary: 'Error', detail: 'ALERTA' },
        ];
    }

    ngOnInit() {
        this.getDevices();
        this.getHosts();
        const storedMessages = localStorage.getItem('messages');
        if (storedMessages) {
            this.messagesHost = JSON.parse(storedMessages);
        }
        this.initCharts();
        this.lisenerMessage();

        this.getMonitoreo();
        // Create an Observable that will publish a value on an interval
        const secondsCounter = interval(240000);
        // Subscribe to begin publishing values
        const subscription = secondsCounter.subscribe({
            next: () => {
                this.getMonitoreo();
            }
        });
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

    // Obtener los host para vincular
    getHosts() {
        this.hostService.getHosts().subscribe({
            next: (data: any) => {
                if (data.metadata[0].codigo == "00") {
                    this.hosts = data.hostResponse.hosts;
                }
            },
            error: (error: any) => {
                console.log("Error", error);
            }
        });
    }

    //Enviar Formulario
    onSubmit() {
        let datosBody = {
            ipDispositivo: this.deviceIp,
            nombreDispositivo: this.deviceName,
            comunidad: this.deviceCommunity,
            host: {
                idHost: this.selectedHost
            }
        };
        this.deviceService.saveDevice(datosBody).subscribe({
            next: (data: any) => {
                if (data.metadata[0].codigo == "00") {
                    this.devices = data.snmpDeviceResponse.snmpdevices;
                    this.visible = false;
                    this.getDevices();
                }
            },
            error: (error: any) => {
                console.log("Error", error);
            }
        });

    }


    // Eliminar dispositivo cargado
    deleteDevice(idDevice: number) {
        this.deviceService.deleteDevices(idDevice).subscribe({
            next: (data: any) => {
                if (data.metadata[0].codigo == "00") {
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

    //Monitoreo SNMP
    getMonitoreo(){
        this.deviceService.getSnmpControl().subscribe();
    }

    lisenerMessage() {
        this.webSocketService.subscribeToSnmpNotifications().subscribe((message: SnmpMessage) => {
            let deviceData = this.snmpDeviceData.find(device => device.idDevice === message.idDevice)
            if (deviceData) {
                deviceData.snmpMessages = message;
                deviceData.dataChartInputs = this.getDataChartInputs(deviceData);
                deviceData.dataChartBypass = this.getDataChartBypass(deviceData);
                this.getDevices();
            } else {
                const newDeviceData: SnmpDeviceData = {
                    idDevice: message.idDevice,
                    snmpMessages: message,
                    dataChartInputs: {
                        labels: [],
                        datasets: [
                            {
                                label: 'Input 1',
                                fill: false,
                                data: [],
                                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                                borderWidth: 1
                            },
                            {
                                label: 'Input 2',
                                fill: false,
                                data: [],
                                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                                borderWidth: 1
                            },
                            {
                                label: 'Input 3',
                                fill: false,
                                data: [],
                                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                                borderWidth: 1
                            }
                        ]
                    },
                    dataChartBypass: {
                        labels: [],
                        datasets: [
                            {
                                label: 'Bypass 1',
                                fill: false,
                                data: [],
                                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                                borderWidth: 1
                            },
                            {
                                label: 'Bypass 2',
                                fill: false,
                                data: [],
                                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                                borderWidth: 1
                            },
                            {
                                label: 'Bypass 3',
                                fill: false,
                                data: [],
                                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                                borderWidth: 1
                            }
                        ]
                    },
                };
                this.snmpDeviceData.push(newDeviceData);
            }

        });

        this.webSocketService.subscribeToPingNotifications().subscribe((messagesHost: any) => {
            const index = this.messagesHost.findIndex((m) => m.idHost === messagesHost.idHost);
            if (index !== -1) {
                this.messagesHost[index] = messagesHost;
            } else {
                this.messagesHost.push(messagesHost);
            }
            localStorage.setItem('messages', JSON.stringify(this.messagesHost));
        });
    }



    /* ---------------------- Funciones Utiles ---------------------------------*/
    isNA(value: any): boolean {
        return value === 'N/A';
    }

    getDeviceById(id: number): SnmpDeviceData | null {
        let deviceData = this.snmpDeviceData.find(device => device.idDevice === id);
        return deviceData || null;
    }

    isOn(host: any): boolean {
        if (host) {
            const latestMessage = this.messagesHost.find((m) => m.idHost === host.idHost);
            return host && latestMessage?.alcanzable && host.idHost === latestMessage?.idHost;
        } else {
            return false;
        }

    }

    showSuccess(message: string) {
        this.messageService.add({ severity: 'info', summary: 'Ok', detail: message });
    }

    showError(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }

    //COnfirmar eliminar Dispositivo
    confirmDelete(event: Event, idDevice: number) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-sm',
            accept: () => {
                this.deleteDevice(idDevice);;
            },
            reject: () => {
                this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: 'Accion Cancelada', life: 3000 });
            }
        });
    }

    showDialog(id: number, ip: string, nombre: string, comunidad: string, host: any) {
        this.idDevice = id;
        this.deviceIp = ip;
        this.deviceName = nombre;
        this.deviceCommunity = comunidad;
        if (host) {
            this.selectedHost = host.idHost;
        } else {
            this.selectedHost = null;
        }
        this.visible = true;
    }

    /*  ---------------------------GRAFICOS  CHARTS ---------------------------------*/
    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.optionsChart = {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    beginAtZero: true,
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }

    //Obtener la info para el grafico
    getDataChartBypass(snmpDeviceData: SnmpDeviceData): any {
        const formattedDate = this.datePipe.transform(snmpDeviceData.snmpMessages.dateAlert, 'HH:mm');

        let labelsArray = snmpDeviceData.dataChartBypass.labels;
        let dataBypass1 = snmpDeviceData.dataChartBypass.datasets[0].data;
        let dataBypass2 = snmpDeviceData.dataChartBypass.datasets[1].data;
        let dataBypass3 = snmpDeviceData.dataChartBypass.datasets[2].data;

        if (labelsArray.length <= 15) {
            labelsArray.push(formattedDate);
            dataBypass1.push(snmpDeviceData.snmpMessages.bypass1);
            dataBypass2.push(snmpDeviceData.snmpMessages.bypass2);
            dataBypass3.push(snmpDeviceData.snmpMessages.bypass3);
        } else {
            labelsArray.shift();
            labelsArray.push(formattedDate);
            dataBypass1.shift();
            dataBypass1.push(snmpDeviceData.snmpMessages.bypass1);
            dataBypass2.shift();
            dataBypass2.push(snmpDeviceData.snmpMessages.bypass2);
            dataBypass3.shift();
            dataBypass3.push(snmpDeviceData.snmpMessages.bypass3);
        }

        return {
            labels: labelsArray,
            datasets: [
                {
                    label: 'Bypass 1',
                    fill: false,
                    data: dataBypass1,
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                },
                {
                    label: 'Bypass 2',
                    fill: false,
                    data: dataBypass2,
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                },
                {
                    label: 'Bypass 3',
                    fill: false,
                    data: dataBypass3,
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };
    }

    //Obtener la info para el grafico
    getDataChartInputs(snmpDeviceData: SnmpDeviceData) {
        const formattedDate = this.datePipe.transform(snmpDeviceData.snmpMessages.dateAlert, 'HH:mm');

        let labelsArray = snmpDeviceData.dataChartInputs.labels;
        let dataInput1 = snmpDeviceData.dataChartInputs.datasets[0].data;
        let dataInput2 = snmpDeviceData.dataChartInputs.datasets[1].data;
        let dataInput3 = snmpDeviceData.dataChartInputs.datasets[2].data;

        if (snmpDeviceData.dataChartInputs.labels.length <= 15) {
            labelsArray.push(formattedDate);
            dataInput1.push(snmpDeviceData.snmpMessages.input1);
            dataInput2.push(snmpDeviceData.snmpMessages.input2);
            dataInput3.push(snmpDeviceData.snmpMessages.input3);
        } else {
            labelsArray.shift();
            labelsArray.push(formattedDate);
            dataInput1.shift();
            dataInput1.push(snmpDeviceData.snmpMessages.input1);
            dataInput2.shift();
            dataInput2.push(snmpDeviceData.snmpMessages.input2);
            dataInput3.shift();
            dataInput3.push(snmpDeviceData.snmpMessages.input3);
        }
        return {
            labels: labelsArray,
            datasets: [
                {
                    label: 'Input 1',
                    fill: false,
                    data: dataInput1,
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                },
                {
                    label: 'Input 2',
                    fill: false,
                    data: dataInput2,
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                },
                {
                    label: 'Input 3',
                    fill: false,
                    data: dataInput3,
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        }
    }
}





