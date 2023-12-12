export interface IOrder {
    _id: string;
    user_id: string,
    firstName: string;
    lastName: string;
    middleName: string;
    deliveryAddress: string;
    phoneNumber: string;
    deliveryDate: string;
    productName: string;
    amount: number;
    additionalService: string;
    comment: string;
    paymentMethod: string;
    finalPrice: number;
    orderStatus: string;
    deliveryCost: number;
  }