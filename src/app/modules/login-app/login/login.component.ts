import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  private router = inject(Router);
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private messageService = inject(MessageService);
  private username = '';

  public visible: boolean = false;
  public loginForm!: FormGroup;
  public confirmForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.confirmForm = this.fb.group({
      username: ['', Validators.required],
      pin: ['', Validators.required],
    });
  }

  //Enviar credenciales para Login
  onSubmit() {
    this.showDialog();
    this.username = this.loginForm.get('username')?.value;
    let datosBody = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    }
    console.log(datosBody)
    this.loginService.postLogin(datosBody).subscribe({
      next: (data: any) => {
        if(data.metadata[0].codigo == "00"){
          this.showDialog();
          localStorage.setItem('user', this.username)
        }      
      },
      error: (error: any) => {
        console.log("Error", error);
        this.showError("Credenciales Incorrectas");
      }
    });
  }

  // Segundo factor de autenticacion, ingresar el pin enviado por Mail y SMS
  confirm(){
    let datosBody = {
      username: this.username,
      pin: this.confirmForm.get('pin')?.value
    }
    this.loginService.postConfirm(datosBody).subscribe({
      next: (data: any) => {
        this.showSuccess("Nuevo OID guardado")
        this.showSuccess("Bienvenido: " + this.username);
        const token = data.jwtResponse.jwt[0].token;
        const fechaExpiracion = data.jwtResponse.jwt[0].expires;

        localStorage.setItem('expires', fechaExpiracion);
        localStorage.setItem('token', token);
        this.router.navigate(['/app/home']);
      },
      error: (error: any) => {
        console.log("Error", error);
        this.showError("Ocurrio un Error al intentar guardar el OID");
      }
    });
  }
  
  goToSignUp(){
    this.router.navigate(['/signin/guardar-usuario']);
  }

  // Mostrar modal
  showDialog() {
    this.visible = true;
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
