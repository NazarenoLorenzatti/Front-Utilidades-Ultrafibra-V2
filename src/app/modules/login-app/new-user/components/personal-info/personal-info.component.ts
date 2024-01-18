import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit{

  public infoForm!: FormGroup;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.infoForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });

  }

  nextStep(){
    this.router.navigate(['/guardar-usuario/confirmar']);
    localStorage.setItem('name', this.infoForm.get('name')?.value);
    localStorage.setItem('lastname', this.infoForm.get('lastname')?.value);
    localStorage.setItem('email', this.infoForm.get('email')?.value);
    localStorage.setItem('phone', this.infoForm.get('phone')?.value);
  }

  backStep(){
    localStorage.removeItem('user'); 
    localStorage.removeItem('pass');
    this.router.navigate(['/guardar-usuario/signup']);
  }
  
}
