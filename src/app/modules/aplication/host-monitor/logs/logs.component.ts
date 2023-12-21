import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogService } from 'src/app/modules/services/monitoreo-ping/logs/log.service';
import { LogModel } from 'src/app/modules/templates/models/log.model';
import { Router } from '@angular/router';

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

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private logService = inject(LogService);
  public logs!: LogModel[];  
  public cols!: Column[];
  public hoursMonth!: number;
  public lastDate!: Date;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const idHost = params['idHost'];

      // Body de request Post (buscar logs del host)
      let datosBody = {
        idHost: idHost
      }   

      this.logService.getLogs(datosBody).subscribe({
        next: (data: any) => {
          if (data.metadata[0].codigo == "00") {
            this.logs= data.logResponse.logs;
            this.getHours(datosBody);
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

  getHours(datosBody: any){    
    this.logService.getLogsForMonth(datosBody).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          data.logResponse.logs.forEach((l: { diferenciaEnHoras: number; }) =>{
            if(l.diferenciaEnHoras){
              this.hoursMonth += l.diferenciaEnHoras; 
            } else {
              this.hoursMonth = 0.0;
            }
                      
          })        
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });

    this.logService.getLastLog(datosBody).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.lastDate = data.logResponse.logs[0].inicio;    
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });


  }

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

    back(){
      this.router.navigate(['/app/monitoreo-ping']);
    }
}
