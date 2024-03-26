import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostMonitorComponent } from './hostmonitor.component';

describe('EventsComponent', () => {
  let component: HostMonitorComponent;
  let fixture: ComponentFixture<HostMonitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostMonitorComponent]
    });
    fixture = TestBed.createComponent(HostMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
