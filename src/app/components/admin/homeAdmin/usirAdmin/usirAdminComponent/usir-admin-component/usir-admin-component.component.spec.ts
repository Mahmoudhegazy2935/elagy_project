import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsirAdminComponentComponent } from './usir-admin-component.component';

describe('UsirAdminComponentComponent', () => {
  let component: UsirAdminComponentComponent;
  let fixture: ComponentFixture<UsirAdminComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsirAdminComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsirAdminComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
