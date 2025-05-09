import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoshtaComponent } from './roshta.component';

describe('RoshtaComponent', () => {
  let component: RoshtaComponent;
  let fixture: ComponentFixture<RoshtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoshtaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoshtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
