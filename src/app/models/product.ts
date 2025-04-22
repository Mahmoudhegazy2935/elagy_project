export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    imagePath: string;
    image?: string;
    quantity: number;
    amount: number; // الكمية اللي المستخدم بيحددها
  showAddButton?: boolean; // الحالة بتاعت الزرار
  }
