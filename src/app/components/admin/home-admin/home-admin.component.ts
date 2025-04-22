import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PharmacyAdminServicesService } from '../homeAdmin/Pharmacy-admin/PharmacyAdminServices/pharmacy-admin-services.service';
import { UsirAdminServicesService } from '../homeAdmin/usirAdmin/UsirAdminServices/usir-admin-services.service';
import { NavebarAdminComponent } from '../navebar-admin/navebar-admin/navebar-admin.component';

@Component({
  selector: 'app-home-admin',
   standalone: true,
  imports: [NavebarAdminComponent,RouterModule,CommonModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {
    pharmacyCount: number = 0;
    usircoint:number=0
    constructor(private pharmacyAdminServicesService: PharmacyAdminServicesService , private usirAdminServicesService:UsirAdminServicesService) {}

    ngOnInit(): void {
      this.pharmacyAdminServicesService.getPharmacies().subscribe(pharmacies => {
        this.pharmacyCount = pharmacies.length;
      });

      this.usirAdminServicesService.getuser().subscribe(data => {
        this.usircoint=data.length});


    }
  }


