import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousOperationsComponent } from './previous-operations.component';

describe('PreviousOperationsComponent', () => {
  let component: PreviousOperationsComponent;
  let fixture: ComponentFixture<PreviousOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
