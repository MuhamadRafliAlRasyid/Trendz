import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourierDashboardPage } from './courier-dashboard.page';

describe('CourierDashboardPage', () => {
  let component: CourierDashboardPage;
  let fixture: ComponentFixture<CourierDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
