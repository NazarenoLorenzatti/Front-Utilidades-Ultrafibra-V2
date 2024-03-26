import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-commons',
  templateUrl: './login-commons.component.html',
  styleUrls: ['./login-commons.component.css']
})
export class LoginCommonsComponent {

  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    this.router.navigate(['/signin/login']);
  }
  
}
