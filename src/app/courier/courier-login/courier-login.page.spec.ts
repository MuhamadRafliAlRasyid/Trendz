import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourierLoginPage } from './courier-login.page';

describe('CourierLoginPage', () => {
  let component: CourierLoginPage;
  let fixture: ComponentFixture<CourierLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
