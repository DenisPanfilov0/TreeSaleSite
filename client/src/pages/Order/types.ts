/*//Этот файл определяет интерфейс IOrder, который описывает структуру объекта заказа, 
//включая данные о пользователе, адресе доставки, продукте, количестве, 
//дополнительных услугах, комментарии, способе оплаты, стоимости заказа и других связанных атрибутах.*/
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
    product_id: number;
    passportSeriesNumber: number;
    passportIssuedBy: string;
  }