import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProfileService } from 'src/app/modules/services/profile/profile.service';
import { RepService } from 'src/app/modules/services/profile/rep/rep.service';

@Component({
  selector: 'app-confirmation-info',
  templateUrl: './confirmation-info.component.html',
  styleUrls: ['./confirmation-info.component.css']
})
export class ConfirmationInfoComponent implements OnInit{

  private profileService = inject(ProfileService);
  private repService = inject(RepService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  public name: string | undefined = localStorage.getItem('name') || undefined;
  public lastname: string | undefined = localStorage.getItem('lastname') || undefined;
  public email: string | undefined = localStorage.getItem('email') || undefined;
  public phone: string | undefined = localStorage.getItem('phone') || undefined;
  public username: string | undefined = localStorage.getItem('user') || undefined;
  
  ngOnInit(): void {
    console.log(this.name);
    console.log(this.lastname);
    console.log(this.email);
    console.log(this.phone);
    console.log(this.username);
  }
 
  
  confirm() {
    let bodyUser = {
      username: localStorage.getItem('user'),
      password: localStorage.getItem('pass'),
    }

    let bodyRep = {
      nombre: localStorage.getItem('name'),
      apellido: localStorage.getItem('lastname'),
      email: localStorage.getItem('email'),
      telefono: localStorage.getItem('phone'),
      usuario: {
        username: localStorage.getItem('user')
      }
    }

    this.profileService.saveUser(bodyUser).subscribe({
      next: (data: any) => {
        if(data.metadata[0].codigo == "00"){
          console.log(data)
          this.showSuccess("Usuario Creado");

          this.repService.saveRep(bodyRep).subscribe({
            next: (data: any) => {
              if(data.metadata[0].codigo == "00"){
                console.log(data)
                this.showSuccess("Nuevo OID guardado")
                this.showSuccess("Bienvenido: " + this.username);
                const token = data.jwtResponse.jwt[0].token;
                const fechaExpiracion = data.jwtResponse.jwt[0].expires;
        
                localStorage.setItem('expires', fechaExpiracion);
                localStorage.setItem('token', token);
                this.router.navigate(['/app/home']);
              }      
            },
            error: (error: any) => {
              console.log("Error", error);
              this.showError("Credenciales Incorrectas");
            }
          });
        }      
      },
      error: (error: any) => {
        console.log("Error", error);
        this.showError("Credenciales Incorrectas");
      }
    });
  }


// Volver Atras
backStep(){
  localStorage.removeItem('name'); 
  localStorage.removeItem('lastname');
  localStorage.removeItem('email'); 
  localStorage.removeItem('phone'); 
  this.router.navigate(['/guardar-usuario/info']);
}

  //Mostrar mensaje Ok
  showSuccess(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Ok', detail: message });
  }

  //Mostrar mensaje de error
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
