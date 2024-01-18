import { Component, OnInit, inject } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { RepService } from '../../services/profile/rep/rep.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private profileService = inject(ProfileService);
  private repService = inject(RepService);

  public user!: any;
  public rep!: any;

  nombre: string = 'Nazareno';
  password: string = '123';
  imgPerfil!: any;

  ngOnInit(): void {
    this.getUser();
  }

  //Obtener usuario en base al ID
  getUser(){
    this.profileService.getUser(35).subscribe({
      next: (data: any) => {
        if(data.metadata[0].codigo === "02"){
          this.user = data.usuarioResponse.usuario[0];
          this.getRep();
        }       
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  // Obtener Administrativo en base a su usuario
  getRep(){
    this.repService.getRep(this.user).subscribe({
      next: (data: any) => {
        if(data.metadata[0].codigo === "00"){
          this.rep = data.administrativoResponse?.administrativo[0];
        }       
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  deleteUser(){
    this.profileService.deleteUser(1).subscribe({
      next: (data: any) => {
        if(data.metadata[0].codigo === "00"){
          this.rep = data.administrativoResponse?.administrativo[0];
        }       
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

}
