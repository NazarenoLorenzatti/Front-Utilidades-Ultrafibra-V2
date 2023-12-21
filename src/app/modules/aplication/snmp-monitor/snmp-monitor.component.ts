import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-snmp-monitor',
  templateUrl: './snmp-monitor.component.html',
  styleUrls: ['./snmp-monitor.component.css']
})
export class SnmpMonitorComponent {
  layout: string = 'list';
  values!:  any ;
  items: MenuItem[] | undefined;
  //private messageService = inject(MessageService); 

  constructor() {}

  ngOnInit() {
    this.items = [
      {
          icon: 'pi pi-pencil',
          command: () => {
              //this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
      },
      {
          icon: 'pi pi-refresh',
          command: () => {
              //this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
          }
      },
      {
          icon: 'pi pi-trash',
          command: () => {
              //this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      },
    
  ];
  }


}
