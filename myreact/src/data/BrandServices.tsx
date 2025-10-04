import axios from "axios";
import { Brand, BrandCreate } from "../interfaces/BrandInterface";

export const FetchBrands=async ()=>{
    
        const apiurl="http://localhost:5237/api/Brand/AllBrands";
        try {
            const response=await axios.get<Brand[]>(apiurl,{
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            }
          
                
            )
            if(response.status==200){
               
                return  response.data;
              
               
            }else{
               console.log("error in fetching products");
            }
    
        } catch (error) {
            console.log(error)
        }
      
};

export const FetchBrandById=async (brandid:string)=>{
    const apiurl="http://localhost:5237/api/Brand/GetBrandById";
    const data={
        brandid
    }
        try {
            const response=await axios.post<Brand>(apiurl,data,{
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            }
          
                
            )
            if(response.status==200){
               
                return  response.data;
              
               
            }else{
               console.log("error in fetching products");
            }
    
        } catch (error) {
            console.log(error)
        }
}

export const SendBrandRequest=async (data:BrandCreate)=>{
     console.log("send"+data);
    const apiurl="http://localhost:5237/api/Brand/CreateOrUpdateBrand";
    try {
        const response=await axios.post(apiurl,data,{
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }
      
            
        )
        if(response.status==200){
           
            return  response.data;
          
           
        }else{
           console.log("error in sending create request for brand");

        }

    } catch (error) {
        console.log(error)
    }
  
};
export const FetchBrandById2=async (brandid:string)=>{
    const apiurl="http://localhost:5237/api/Brand/GetBrandById";
    const data={
        brandid
    }
        try {
            const response=await axios.post<Brand>(apiurl,data,{
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            }
          
                
            )
            if(response.status==200){
               
                return  response.data;
              
               
            }else{
               console.log("error in fetching products");
            }
    
        } catch (error) {
            console.log(error)
        }
}

export const SendBrandRequestDeletion=async (brandid:string)=>{
    const data={
          brandid:brandid
    }
    const apiurl="http://localhost:5237/api/Brand/Delete";
    try {
        const response=await axios.post(apiurl,data,{
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }
      
            
        )
        if(response.status==200){
           
            return  response.data;
          
           
        }else{
           console.log("error in sending create request for brand");
        }

    } catch (error) {
        console.log(error)
    }
  
};
