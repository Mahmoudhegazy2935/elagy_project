import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyRegistrationComponent } from './pharmacy-registration.component';

describe('PharmacyRegistrationComponent', () => {
  let component: PharmacyRegistrationComponent;
  let fixture: ComponentFixture<PharmacyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
