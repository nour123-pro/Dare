export interface Brand {
    brandId: string;
    brandName: string;
    brandDescription: string;
    brandImage?: string[]; // base64-encoded image (byte[] in C#)
    isDeleted: boolean;
    createdAt: string; // ISO 8601 format
    brandQuote:string;
  }
  export interface BrandCreate{
    BrandName:string,
    BrandDescription:string,
    BrandImage?: string[];
    BrandId?: string;
  }
  