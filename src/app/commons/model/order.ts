import { Currency, DeliveryStatus, PaymentType, OrderStatus, VehicleType, PackageType } from '../../shared/types';

export class Order {
  public id: string;
  public lang: string;
  public orderType: string;
  public userId: string;

  public ccardId?: string;
  public creationDate: string = '';
  public currency: Currency = Currency.SAR;
  public deliveryStatus?: DeliveryStatus;
  public directions; // TODO
  public driverId?: number;
  public dropOff: Peer = new Peer();
  public gift?: string;
  public history: OrderHistory[] = [];
  public merchantId?: string;
  public merchantName?: string;
  public merchantOrderReference?: string;
  public message: string;
  public orderLines: OrderLine[] = [];
  public paid: boolean;
  public paymentType: PaymentType;
  public pickUp: Peer = new Peer();
  public reason: string;
  public requiredDeliveryDate: string;
  public status: OrderStatus;
  public totalCosts: TotalCosts = new TotalCosts();
  public vehicleType: VehicleType;


  constructor() {
  }
}

export class Peer {
  public address: DeliveryAddress;
  public posId?: string;
  public userId?: string;

  constructor() {}
}

export class DeliveryAddress {
  public addressLine1?: string;
  public addressLine2?: string;
  public addressType?: string;
  public area?: string;
  public city?: string;
  public country?: string;
  public geoPoint: PointOnMap; // TODO
  public note?: string;
  public state?: string;
  public zip?: string;

  constructor() {}
}

export class PointOnMap {
  public lat: number;
  public lon: number;

  constructor() {}
}

export class TotalCosts {
  public DELIVERY_COST: number = 0;
  public DISCOUNT: number = 0;
  public PICKUP_COST: number = 0;
  public SERVICE_FEE: number = 0;

  constructor() {}
}

export class OrderLine {
  public productId: string;

  public images: string[] = [];
  public name: string;
  public note: string;
  public packageType: PackageType;
  public price: number;
  public productOptionsValues: OrderItemOptionsValue[] = [];
  public quantity: number;

  constructor() {
  }
}

export class OrderItemOptionsValue {
  public optionId: string;
  public optionName: string;
  public optionValueId: string;
  public optionValueName: string;
  public optionValuePrice: number;

  constructor() {
  }
}

export class OrderHistory {
  public date: string;
  public estimatedDate: string;
  public future: boolean;
  public imageType: string;
  public imageUrl: string;
  public reason: string;
  public type: OrderStatus | DeliveryStatus;
}
