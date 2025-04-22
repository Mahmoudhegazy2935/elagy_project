import { Component, OnInit, signal } from '@angular/core';
import { PharmacyAdminModels } from '../../PharmacyAdminModels/pharmacy-admin-models';
import { PharmacyAdminServicesService } from '../../PharmacyAdminServices/pharmacy-admin-services.service';
import { RouterModule } from '@angular/router';
import { NavebarAdminComponent } from '../../../../navebar-admin/navebar-admin/navebar-admin.component';

@Component({
  selector: 'app-pharmacy-list',
  standalone: true,
  imports: [RouterModule, NavebarAdminComponent],
  templateUrl: './pharmacy-list.component.html',
  styleUrl: './pharmacy-list.component.css'
})
export class PharmacyListComponent implements OnInit {
  pharmacies = signal<PharmacyAdminModels[]>([]);

  constructor(private pharmacyAdminServicesService: PharmacyAdminServicesService) {}

  ngOnInit(): void {
    this.pharmacyAdminServicesService.getPharmacies().subscribe(data => {
      this.pharmacies.set(data);
    });
  }

  deletePharmacy(id: number) {
    if (confirm("هل أنت متأكد من إزالة هذا الحساب؟")) {
      this.pharmacyAdminServicesService.deletePharmacy(id).subscribe(() => {
        this.pharmacies.update(prev => prev.filter(ph => ph.id !== id));
      });
    }
}}
