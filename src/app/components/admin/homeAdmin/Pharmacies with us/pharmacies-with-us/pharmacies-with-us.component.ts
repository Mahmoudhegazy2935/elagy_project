import { Component, signal } from '@angular/core';
import { NavebarAdminComponent } from '../../../navebar-admin/navebar-admin/navebar-admin.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsirAdminModels } from '../../usirAdmin/UsirAdminModels/usir-admin-models';
import { PharmaciesWithUsService } from '../pharmacies-with-us.service';

@Component({
  selector: 'app-pharmacies-with-us',
  standalone: true,
  imports: [NavebarAdminComponent, RouterModule,CommonModule],
  templateUrl: './pharmacies-with-us.component.html',
  styleUrl: './pharmacies-with-us.component.css'
})
export class PharmaciesWithUsComponent {
  usieadmin = signal<UsirAdminModels[]>([]);

  constructor(private pharmaciesWithUsService: PharmaciesWithUsService) {}

  ngOnInit(): void {
    this.pharmaciesWithUsService.getuser().subscribe(data => {
      this.usieadmin.set(data);
      console.log("بيانات السيرفر:", data);
    });
  }

  // For trackBy in *ngFor
  trackByIndex(index: number, item: UsirAdminModels): number {
    return index;
  }
}
