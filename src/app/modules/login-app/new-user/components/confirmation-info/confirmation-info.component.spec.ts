import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationInfoComponent } from './confirmation-info.component';

describe('ConfirmationInfoComponent', () => {
  let component: ConfirmationInfoComponent;
  let fixture: ComponentFixture<ConfirmationInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationInfoComponent]
    });
    fixture = TestBed.createComponent(ConfirmationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
