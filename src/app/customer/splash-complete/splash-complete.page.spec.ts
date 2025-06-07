import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashCompletePage } from './splash-complete.page';

describe('SplashCompletePage', () => {
  let component: SplashCompletePage;
  let fixture: ComponentFixture<SplashCompletePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
