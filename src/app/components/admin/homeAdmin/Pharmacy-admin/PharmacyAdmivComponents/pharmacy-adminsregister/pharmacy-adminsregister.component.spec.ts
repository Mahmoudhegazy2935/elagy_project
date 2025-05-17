import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyAdminsregisterComponent } from './pharmacy-adminsregister.component';

describe('PharmacyAdminsregisterComponent', () => {
  let component: PharmacyAdminsregisterComponent;
  let fixture: ComponentFixture<PharmacyAdminsregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyAdminsregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyAdminsregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
