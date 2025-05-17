import { Component, signal } from '@angular/core';
import { PharmacyAdminModelsregister } from '../../PharmacyAdminModels/pharmacy-admin-modelsregister';
import { PharmacyAdminServicesService } from '../../PharmacyAdminServices/pharmacy-admin-services.service';
import { NavebarAdminComponent } from "../../../../navebar-admin/navebar-admin/navebar-admin.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pharmacy-adminsregister',
  standalone: true,
  imports: [NavebarAdminComponent,RouterModule],
  templateUrl: './pharmacy-adminsregister.component.html',
  styleUrl: './pharmacy-adminsregister.component.css'
})
export class PharmacyAdminsregisterComponent {
  pharmacies = signal<PharmacyAdminModelsregister[]>([]);

  constructor(private pharmacyAdminServicesService: PharmacyAdminServicesService) {}

  ngOnInit(): void {
    this.pharmacyAdminServicesService.getPharmaciesregister().subscribe(data => {
      this.pharmacies.set(data);
    });
  }
}
