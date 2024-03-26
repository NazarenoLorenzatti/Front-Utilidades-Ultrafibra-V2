import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild('snav', { static: true }) sidenav!: MatSidenav;
  private router = inject(Router);

  nombre: string = 'Nazareno';
  apellido: string = 'Lorenzatti';
  email: string = 'nl.loragro@gmail.com';
  telefono: string = '3466404290';
  username: string = 'Admin';
  password: string = '123';
  imgPerfil!: any;
  menuNavPc: any;
  menuNavMobile: any;
  pantallaCelu: MediaQueryList;


  constructor(media: MediaMatcher) {
    this.pantallaCelu = media.matchMedia('(max-width: 865px)');
    this.menuNavMobile = [
      {
        name: "Home",
        ruta: "home",
        icono: "home"
      },

      {
        name: "Eventos Ping",
        ruta: "monitoreo-ping",
        icono: "add_alert"
      },
      {
        name: "Monitoreo SNMP",
        ruta: "monitoreo-snmp",
        icono: "desktop_windows"
      },
      {
        name: "Tecnicos",
        ruta: "tecnicos",
        icono: "face"
      },
      {
        name: "Perfil",
        ruta: "perfil",
        icono: "perm_identity"
      }
    ]

    this.menuNavPc = [
      {
        name: "Home",
        ruta: "home",
        icono: "home"
      },
      {
        name: "Homebanking",
        ruta: "homebanking",
        icono: "account_balance"
      },
      {
        name: "Debitos Automaticos",
        ruta: "debitos",
        icono: "payment"
      },
      {
        name: "Eventos Ping",
        ruta: "monitoreo-ping",
        icono: "add_alert"
      },
      {
        name: "Monitoreo SNMP",
        ruta: "monitoreo-snmp",
        icono: "desktop_windows"
      },
      {
        name: "Tecnicos",
        ruta: "tecnicos",
        icono: "face"
      },
      {
        name: "Perfil",
        ruta: "perfil",
        icono: "perm_identity"
      }
    ]

  }

  ngOnInit(): void {
    if (!this.pantallaCelu.matches) {
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }
  }

  procesarResponse(resp: any) {
    if (resp.metadata[0].codigo == "00") {
      this.nombre = resp.administrativoResponse.administrativo[0].nombre;
      this.apellido = resp.administrativoResponse.administrativo[0].apellido;
      this.email = resp.administrativoResponse.administrativo[0].email;
      this.telefono = resp.administrativoResponse.administrativo[0].telefono;
      this.username = resp.administrativoResponse.administrativo[0].usuario.username;
      this.password = resp.administrativoResponse.administrativo[0].usuario.password;
      if (resp.administrativoResponse.administrativo[0].usuario.imgPerfil === null) {
        this.imgPerfil = null;
      } else {
        this.imgPerfil = 'data:image/jpeg;base64,' + resp.administrativoResponse.administrativo[0].usuario.imgPerfil;
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
