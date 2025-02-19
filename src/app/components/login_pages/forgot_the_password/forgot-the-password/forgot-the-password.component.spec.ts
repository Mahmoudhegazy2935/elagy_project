import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotThePasswordComponent } from './forgot-the-password.component';

describe('ForgotThePasswordComponent', () => {
  let component: ForgotThePasswordComponent;
  let fixture: ComponentFixture<ForgotThePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotThePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotThePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
