/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
export enum SectionType {
  deals = <any>'deals',
  catalogs = <any>'catalogs',
  stores = <any>'stores',
  specials = <any>'specials'
}

export enum CategoryType {
  REGULAR = <any>'REGULAR',
  MEAL = <any>'MEAL',
  GIFT = <any>'GIFT',
  PROMO = <any>'PROMO',
  TRENDING = <any>'TRENDING',
  FEAT_CATEGORIES = <any>'FEAT_CATEGORIES',
  FEAT_PRODUCTS = <any>'FEAT_PRODUCTS'
}

export enum Currency {
  SAR = <any>'SAR',
  USD = <any>'USD'
}

export enum PaymentType {
  CASH = <any>'CASH',
  CC = <any>'CC'
}

export enum OrderStatus {
  NEW = <any>'NEW',
  NOT_CONFIRMED = <any>'NOT_CONFIRMED',
  SUSPENDED = <any>'SUSPENDED',
  READY_TO_EXECUTE = <any>'READY_TO_EXECUTE',
  ACCEPTED = <any>'ACCEPTED',
  COMPLETED = <any>'COMPLETED',
  CANCELLED = <any>'CANCELLED',
  TO_SUPPORT = <any>'TO_SUPPORT'
}

export enum DeliveryStatus {
  ON_THE_WAY_TO_PICK_UP = <any>'ON_THE_WAY_TO_PICK_UP',
  AT_PICK_UP = <any>'AT_PICK_UP',
  ON_THE_WAY_TO_DROP_OFF = <any>'ON_THE_WAY_TO_DROP_OFF',
  AT_DROP_OFF = <any>'AT_DROP_OFF'
}

export type CommonOrderStatus = OrderStatus | DeliveryStatus;

export enum VehicleType {
  SCOOTER = <any>'SCOOTER',
  CAR = <any>'CAR',
  TRUCK = <any>'TRUCK'
}

export enum PackageType {
  SMALL = <any>'SMALL',
  MEDIUM = <any>'MEDIUM',
  BIG = <any>'BIG'
}

export enum OrderAction {
  COMPLETE = <any> 'COMPLETE',
  CANCEL = <any> 'CANCEL',
  TO_SUPPORT = <any> 'TO_SUPPORT'
}

export enum WorkTimeType {
  REGULAR = <any> 'REGULAR',
  RAMADAN = <any> 'RAMADAN'
}

export enum MarketingAttributeType {
  PROMO = <any> 'PROMO',
  GIFT = <any> 'GIFT',
  TRENDING = <any> 'TRENDING'
}

