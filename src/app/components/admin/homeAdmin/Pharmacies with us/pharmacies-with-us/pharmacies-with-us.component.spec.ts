import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaciesWithUsComponent } from './pharmacies-with-us.component';

describe('PharmaciesWithUsComponent', () => {
  let component: PharmaciesWithUsComponent;
  let fixture: ComponentFixture<PharmaciesWithUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmaciesWithUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmaciesWithUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
