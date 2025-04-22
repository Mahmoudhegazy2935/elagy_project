import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavebarAdminComponent } from './navebar-admin.component';

describe('NavebarAdminComponent', () => {
  let component: NavebarAdminComponent;
  let fixture: ComponentFixture<NavebarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavebarAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavebarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
