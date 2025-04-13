export interface PharmacyAdminModels {
    id: number;
  pharmacyName: string;
  pharmacyPhone: string;
  workingHours: string;
  deliveryArea: string;
  managerName: string;
  managerPhone: string;
  products: any; // ممكن تعدلها حسب البنية لاحقًا
  orders: any;   // ممكن تعدلها حسب البنية لاحقًا
}
