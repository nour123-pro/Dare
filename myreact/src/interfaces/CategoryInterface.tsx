export interface Category {
    categoryId: string;
    categoryName: string;
    categoryImage?: string; // base64-encoded image (byte[] in C#)
    categoryColor: string;
    createdAt: string; // ISO 8601 date format
  }
  

  export interface SaveCategoryRequest {
    categoryid?: string;
    categoryimages?: string[];
    categorycolor?: string;
    categoryname: string;  // required
  }
  