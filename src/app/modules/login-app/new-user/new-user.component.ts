import { Component, inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  items!: MenuItem[];
  
  private router = inject(Router);
  subscription!: Subscription;

  constructor(public messageService: MessageService) {}

  ngOnInit() {
      this.items = [
          {
              label: 'Nuevo usuario',
              routerLink: '/guardar-usuario/signup'
          },
          {
              label: 'Informacion Personal',
              routerLink: '/guardar-usuario/info'
          },
          {
              label: 'Confirmacion',
              routerLink: '/guardar-usuario/confirmar'
          }
      ];

      this.router.navigate(['/guardar-usuario/signup']);
  }


}
