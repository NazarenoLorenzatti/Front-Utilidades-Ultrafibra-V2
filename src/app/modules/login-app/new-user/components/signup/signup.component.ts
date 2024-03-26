import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProfileService } from 'src/app/modules/services/profile/profile.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signUpForm!: FormGroup;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  // Guardar usuario Nuevo
  nextStep() {
    localStorage.setItem('user', this.signUpForm.get('username')?.value);
    localStorage.setItem('pass', this.signUpForm.get('password')?.value);
    this.router.navigate(['/guardar-usuario/info']);
  }

}
