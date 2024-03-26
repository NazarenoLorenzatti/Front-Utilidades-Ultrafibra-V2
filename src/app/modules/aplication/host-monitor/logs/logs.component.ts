import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogService } from 'src/app/modules/services/monitoreo-ping/logs/log.service';
import { LogModel } from 'src/app/modules/templates/models/log.model';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { min } from 'rxjs';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  // Servicios
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private logService = inject(LogService);
  private datePipe= inject(DatePipe);

  // Atributos Privados
  private idHost!: number;

  // Atributos Publicos
  public logs!: LogModel[];
  public cols!: Column[];
  public dataChart: any;
  public optionsChart: any;

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
      this.idHost = params['idHost'];

      // Body de request Post (buscar logs del host)
      let datosBody = {
        idHost: this.idHost
      }
      this.logService.getLogs(datosBody).subscribe({
        next: (data: any) => {
          if (data.metadata[0].codigo == "00") {
            this.logs = data.logResponse.logs;
            this.initChart();
            this.cols = [
              { field: 'idHost', header: 'Id Host' },
              { field: 'inicio', header: 'Inicio' },
              { field: 'fin', header: 'Apagado' },
              { field: 'diferenciaEnHoras', header: 'Cantidad de Horas' },
            ];
          }
        },
        error: (error: any) => {
          console.log("Error", error);
        }
      });
    });
  }

  // Obtener Horas de funcionamiento del generador del ultimo mes
  getTotalTiempoUso(logs: any): number {
    const currentDate = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    let hoursMonth = 0;
    logs?.forEach((log: { diferenciaEnHoras: number; inicio: Date }) => {
      if (log.diferenciaEnHoras && log.inicio) {
        const logDate = new Date(log.inicio);
        if (logDate >= lastMonth && logDate <= currentDate) {
          hoursMonth += log.diferenciaEnHoras;
        }
      }
    });
    return hoursMonth;
  }

  // Limpiar todos los Logs de este Host
  clearLogs(event: Event) {
    let datosBody = {
      idHost: this.idHost
    }
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro que desea eliminar?',
      header: 'Confirmar Eliminar',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.logService.deleteLog(datosBody).subscribe({
          next: (data: any) => {
            if (data.metadata[0].codigo == "00") {
              this.logs = data.logResponse.logs;
              this.cols = [
                { field: 'idHost', header: 'Id Host' },
                { field: 'inicio', header: 'Inicio' },
                { field: 'fin', header: 'Apagado' },
                { field: 'diferenciaEnHoras', header: 'Cantidad de Horas' },
              ];
            }
          },
          error: (error: any) => {
            console.log("Error", error);
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Operacion Cancelada', detail: 'Operacion Cancelada' });
      }
    });

  }

  // Obtener color de etiqueta
  getSeverity(dif: number) {
    switch (dif) {
      case 2:
        return 'success';
      case 3:
        return 'warning';
      default:
        return '';
    }
  }

  //Volver atras
  back() {
    this.router.navigate(['/app/monitoreo-ping']);
  }

  // Mensaje Ok
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se guardo El Host' });
  }

  // Mensaje Error
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el Host' });
  }




  // INICIAR GRAFICO
  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.getDataChart();
    this.optionsChart = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
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
  }

  //Obtener la info para el grafico
  getDataChart() {
    let labelsChart: any[] = [];
    let datasChart: any[] = [];

    // Obtener el número máximo de logs que queremos mostrar (en este caso, 4)
    const maxLogsToShow = 4;    
    // Obtener la cantidad total de logs
    const totalLogs = this.logs?.length;    
   
    // Calcular el índice inicial basado en el número total de logs y el máximo que queremos mostrar
    const startIndex = Math.max(0, totalLogs - maxLogsToShow);    
    // Recorrer los logs desde el índice inicial hasta el final
    for (let i = startIndex; i < totalLogs; i++) {
      const formattedDate = this.datePipe.transform(this.logs[i].inicio, 'dd/MM-HH:mm');
      labelsChart.push(formattedDate);
      datasChart.push(this.logs[i].diferenciaEnHoras);
    }

    this.dataChart = {
      labels: labelsChart,
      datasets: [
        {
          label: 'Cant. Encendido en Min',
          fill: true,
          data:  datasChart,
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };
  }
}

