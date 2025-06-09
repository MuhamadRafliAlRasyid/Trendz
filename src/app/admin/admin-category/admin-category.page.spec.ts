import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCategoryPage } from './admin-category.page';

describe('AdminCategoryPage', () => {
  let component: AdminCategoryPage;
  let fixture: ComponentFixture<AdminCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
