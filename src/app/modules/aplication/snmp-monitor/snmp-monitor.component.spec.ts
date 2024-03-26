import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnmpMonitorComponent } from './snmp-monitor.component';

describe('SnmpMonitorComponent', () => {
  let component: SnmpMonitorComponent;
  let fixture: ComponentFixture<SnmpMonitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnmpMonitorComponent]
    });
    fixture = TestBed.createComponent(SnmpMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
