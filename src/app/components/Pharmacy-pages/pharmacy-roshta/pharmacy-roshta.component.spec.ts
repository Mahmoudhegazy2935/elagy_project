import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyRoshtaComponent } from './pharmacy-roshta.component';

describe('PharmacyRoshtaComponent', () => {
  let component: PharmacyRoshtaComponent;
  let fixture: ComponentFixture<PharmacyRoshtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyRoshtaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyRoshtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
