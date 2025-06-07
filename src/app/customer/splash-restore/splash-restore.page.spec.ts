import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashRestorePage } from './splash-restore.page';

describe('SplashRestorePage', () => {
  let component: SplashRestorePage;
  let fixture: ComponentFixture<SplashRestorePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashRestorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
