import { Brand } from "./BrandInterface";
import { Category } from "./CategoryInterface";


export interface Product {
  productIngredients: never[];
  productId: string; // Guid as string
  productName: string;
  productDescription: string;
  productPrice:string;
  isDeleted: boolean;
  brandId: string;
  brand: Brand;
  categoryId: string;
  category: Category;
  productImages: string[]; 
  rating: number; 

}
// types/ProductCreateRequest.ts
export interface ProductCreateRequest {
  productname: string;
  brandid: string;
  productdescription: string;
  categoryid: string;
  ProductImages?: string[];
  productprice: string;
  productingredients?: string[];
  productid?:string
}
