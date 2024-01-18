import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCommonsComponent } from './login-commons.component';

describe('LoginCommonsComponent', () => {
  let component: LoginCommonsComponent;
  let fixture: ComponentFixture<LoginCommonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginCommonsComponent]
    });
    fixture = TestBed.createComponent(LoginCommonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
