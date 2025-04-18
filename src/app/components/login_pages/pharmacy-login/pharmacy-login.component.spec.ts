import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyLoginComponent } from './pharmacy-login.component';

describe('PharmacyLoginComponent', () => {
  let component: PharmacyLoginComponent;
  let fixture: ComponentFixture<PharmacyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
