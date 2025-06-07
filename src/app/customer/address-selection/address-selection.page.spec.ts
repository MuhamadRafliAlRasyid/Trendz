import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressSelectionPage } from './address-selection.page';

describe('AddressSelectionPage', () => {
  let component: AddressSelectionPage;
  let fixture: ComponentFixture<AddressSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
