import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebankingComponent } from './homebanking.component';

describe('HomebankingComponent', () => {
  let component: HomebankingComponent;
  let fixture: ComponentFixture<HomebankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomebankingComponent]
    });
    fixture = TestBed.createComponent(HomebankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
