export interface PharmacyAdminModels {
    id: number;
  pharmacyName: string;
  pharmacyPhone: string;
  workingHours: string;
  deliveryArea: string;
  password:string;
  managerName: string;
  managerPhone: string;
  tradeLicense :string;
  taxCard :string;
  pharmacyLicense :string;

  products: any; // ممكن تعدلها حسب البنية لاحقًا
  orders: any;   // ممكن تعدلها حسب البنية لاحقًا
}
