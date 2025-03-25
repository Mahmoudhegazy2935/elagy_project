import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingCartComponent } from './processing-cart.component';

describe('ProcessingCartComponent', () => {
  let component: ProcessingCartComponent;
  let fixture: ComponentFixture<ProcessingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessingCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
