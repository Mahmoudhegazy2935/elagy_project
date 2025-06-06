import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPharmacyComponent } from './add-pharmacy.component';

describe('AddPharmacyComponent', () => {
  let component: AddPharmacyComponent;
  let fixture: ComponentFixture<AddPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPharmacyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
