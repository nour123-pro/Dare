import { Address } from "./ReviewInterface";

export interface ProductOrderItem {
    // [Required(ErrorMessage ="Product id is required")]
    ProductId: string;
     // [Required(ErrorMessage ="Product Quantity is required")]
    Quantity: number;
}

// Matches C#'s OrderCreateRequest
export interface OrderCreateRequest {
    // [Required(ErrorMessage ="AccountId is Required")]
    AccountId: string;
     // [Required(ErrorMessage ="Products are Required")]
    Products: ProductOrderItem[];
     // [Required(ErrorMessage ="OrderDate is  Required")]
    OrderDate: string; // Using string to represent DateTime in ISO format
    Notes?: string; // Matches C#'s string?
    // [Required(ErrorMessage = "Order address is required")]
    OrderAddress: Address;
}