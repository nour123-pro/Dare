import axios from "axios";
import { Product, ProductCreateRequest } from "../interfaces/ProductInterface";
import { products } from "./Data";
import { Review } from "../interfaces/ReviewInterface";

// eslint-disable-next-line react-hooks/rules-of-hooks

export const  fetchProducts=async ()=>{
    const apiurl="http://localhost:5237/api/Product/GetAllProducts";
    try {
        const response=await axios.post<Product[]>(apiurl,{
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },

           
        }

       
      
            
        )
        if(response.status==200){
            console.log(response.data)
           return response.data;
        }else{
            console.log("error in fetching products");
        }

    } catch (error) {
        console.log(error);
    }
};

export const fetchProductById=async (productid:string)=>{
    
    const apiurl="http://localhost:5237/api/Product/GetProductById";
    const datasent={
         productid
    }
    try {
        const response=await axios.post(apiurl,datasent,{
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }
      
            
        )
        if(response.status==200){
           return response.data.data;
        }else{
            console.log("error in fetching products");
        }

    } catch (error) {
        console.log(error);
    }
};
export const fetchProductReviewsByProductId=async(productid:string)=>{
    const apiurl="http://localhost:5237/api/Review/GetReviewForProduct";
    const datasent={
         productid
    }
    try {
        const response=await axios.post<Review[]>(apiurl,datasent,{
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }
      
            
        )
        if(response.status==200){
           return response.data;
        }else{
            console.log("error in fetching products");
        }

    } catch (error) {
        console.log(error);
    }
};


export const DeleteProduct=async(productid:string)=>{
    const apiurl="http://localhost:5237/api/Product/DeleteProduct";
    const datasent={
         productid
    }
    try {
        const response=await axios.post(apiurl,datasent,{
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }
      
            
        )
        if(response.status==200){
           return response.data;
        }else{
            console.log("error in fetching products");
        }

    } catch (error) {
        console.log(error);
    }
};




export const createProduct = async (productData: ProductCreateRequest): Promise<unknown> => {
const apiurl="http://localhost:5237/api/Product/SaveProduct";
console.log('object sent is',productData);
  try {
    const response = await axios.post(apiurl, productData);
    return response.data;
  } catch (error: unknown) {
    console.error("Create product failed:", error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: "Unknown error" };
    } else {
      throw { message: "Unknown error" };
    }
  }
};





