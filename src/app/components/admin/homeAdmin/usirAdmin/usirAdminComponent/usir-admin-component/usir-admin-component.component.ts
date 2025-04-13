import { Component, signal } from '@angular/core';
import { UsirAdminModels } from '../../UsirAdminModels/usir-admin-models';
import { UsirAdminServicesService } from '../../UsirAdminServices/usir-admin-services.service';
import { NavebarAdminComponent } from "../../../../../navebar-admin/navebar-admin/navebar-admin.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usir-admin-component',
  standalone: true,
  imports: [NavebarAdminComponent, RouterModule,CommonModule],
  templateUrl: './usir-admin-component.component.html',
  styleUrl: './usir-admin-component.component.css'
})
export class UsirAdminComponentComponent {
  // Signal to hold user data
  usieadmin = signal<UsirAdminModels[]>([]);

  constructor(private usirAdminServicesService: UsirAdminServicesService) {}

  ngOnInit(): void {
    this.usirAdminServicesService.getuser().subscribe(data => {
      this.usieadmin.set(data);
      console.log("بيانات السيرفر:", data);
    });
  }

  // For trackBy in *ngFor
  trackByIndex(index: number, item: UsirAdminModels): number {
    return index;
  }
}
