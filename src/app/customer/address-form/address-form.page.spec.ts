import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressFormPage } from './address-form.page';

describe('AddressFormPage', () => {
  let component: AddressFormPage;
  let fixture: ComponentFixture<AddressFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
