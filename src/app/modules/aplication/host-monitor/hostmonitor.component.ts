import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HostsService } from '../../services/monitoreo-ping/hosts/hosts.service';
import { DatasetsService } from '../../services/monitoreo-ping/datasets/datasets.service';
import { interval, startWith, Subscription, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import 'chartjs-plugin-zoom';

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

@Component({
    selector: 'app-events',
    templateUrl: './hostmonitor.component.html',
    styleUrls: ['./hostmonitor.component.css']
})
export class HostMonitorComponent implements OnInit, OnDestroy {

    private router = inject(Router);

    //Formulario Modal
    visible: boolean = false;
    public formulario!: FormGroup;
    private fb = inject(FormBuilder);
    private messageService = inject(MessageService);

    // Schedule
    private intervalSubscription!: Subscription;

    // SERVICIOS
    private hostService = inject(HostsService);

    // Atributos Locales
    public hosts: any[] = [];
    public listData: any[] = [];
    public options: any;

    constructor() {
        this.formulario = this.fb.group({
            nombreHost: ['', Validators.required],
            ipHost: ['', [Validators.required]],
        });
    }

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

    showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se guardo El Host' });
    }

    showError() {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el Host' });
    }

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


    ngOnDestroy(): void {
        this.stopPingTask();
    }

    // Metodos
    ngOnInit() {
        this.getHosts();
        // Caracteristicas de los graficos.
        this.options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'x',
                    },
                    pan: {
                        enabled: true,
                        mode: 'x',
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        tick: {
                            maxTicksLimit: 10,
                        },
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    min: 0,
                    max: 2,
                    beginAtZero: true,
                    position: 'left',
                    bounds: 'data',
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        this.startPingTask();
    }

    // Obtener todos los hosts
    getHosts() {
        this.hostService.getHosts().subscribe({
            next: (data: any) => {
                if (data.metadata[0].codigo == "00") {
                    this.hosts = data.hostResponse.hosts;
                    this.getDataSets(this.hosts);
                }
            },
            error: (error: any) => {
                console.log("Error", error);
            }
        });
    }

    // Hacer ping a los Hosts - Tarea programada
    ping() {
        this.hosts.forEach(host => {
            this.hostService.newPing(host.ipHost).subscribe({
                next: (data: any) => {
                    if (data.metadata[0].codigo == "00") {
                        this.hosts = data.hostResponse.hosts;
                        this.getDataSets(this.hosts);
                        this.getHosts();
                    }
                },
                error: (error: any) => {
                    console.log("Error", error);
                }
            });
        });

    }

    // Obtener los datos a graficar por Host
    getDataSets(hosts: any[]) {
        hosts.forEach(host => {
            if (host != null) {
                const dataSets: any[] = host.datasets;
                const values: number[] = [];
                const labels: string[] = [];
                let color: string = 'rgb(97, 130, 100)';

                if (dataSets) {
                    dataSets.forEach(data => {
                        // Valor a graficar
                        values.push(data.valor);
                        if (data.valor !== 1) {
                            color = 'rgb(225, 27, 79)';
                        }
                        // Label eje X
                        const fecha = new Date(data.fecha);
                        labels.push(fecha.toLocaleDateString());
                    });
                }

                const dataChart = {
                    labels: labels.slice(-10),
                    datasets: [
                        {
                            label: host.nombreHost,
                            axis: 'x',
                            data: values,
                            fill: false,
                            borderColor: color,
                            borderWidth: 2,
                            pointBackgroundColor: color,
                            pointRadius: 5,
                            tension: 0.4
                        }
                    ],
                };
                this.listData.push(dataChart);
            }
        });

    }

    // PROGRAMACION DE TAREAS
    private startPingTask() {
        const intervaloDeTiempo = 180000;
        const intervalo$ = interval(intervaloDeTiempo);
        this.intervalSubscription = intervalo$.pipe(
            startWith(0),
            switchMap(async () => this.ping())
        ).subscribe();
    }

    private stopPingTask() {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
        }
    }

    showDialog() {
        this.visible = true;
    }

    viewLog(idHost: number) {
        this.router.navigate(['/app/log'], {
            queryParams: { idHost: idHost }
        });
    }

}



