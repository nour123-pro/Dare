import { Account } from "./AccountInterface";
import { Product } from "./ProductInterface";
// Address.ts
export interface Country {
  
  CountryName: string;
  City?: string;
}
export interface Review {
  reviewId: string; // Guid
  accountId: string;
  account:Account;
  reviewContent: string;
  createdAt: string; // DateTime in ISO string format
  isDeleted: boolean;
  productId: string;
  product: Product;
  ratingNumber:number;
}

export interface Address {
  addressId?: string;
  longitude?: number;
  latitude?: number;
  country: Country;
  streetName?: string;
}



export interface OrderProduct {
  orderProductId: string;
  productId: string;
  product: Product;
  productName: string;
  productUnitPrice: number;
  productCategoryName: string;
  productBrandName: string;
  quantity: number;
  totalPrice: number;
  orderId: string;

}



export interface Order {
  orderId: string;
  accountId: string;
  createdAt: string; // Use string for DateTime when receiving JSON
  expectedDelievery: string;
  orderAddress: Address;
  isDeleted: boolean;
  isDelievered: boolean;
  totalOrderPrice: number;
  orderProducts: OrderProduct[];
  isAccepted:boolean;
  gender:number;
}