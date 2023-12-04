import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCommonsComponent } from './app-commons.component';

describe('AppCommonsComponent', () => {
  let component: AppCommonsComponent;
  let fixture: ComponentFixture<AppCommonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppCommonsComponent]
    });
    fixture = TestBed.createComponent(AppCommonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
