import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterCourierPage } from './register-courier.page';

describe('RegisterCourierPage', () => {
  let component: RegisterCourierPage;
  let fixture: ComponentFixture<RegisterCourierPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCourierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
