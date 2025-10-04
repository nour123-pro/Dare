import axios from "axios";
import { Category, SaveCategoryRequest } from "../interfaces/CategoryInterface";

export const fetchCategories=async ()=>{
    const apiurl="http://localhost:5237/api/Category/GetAllCategories";
   
    try {
        const response=await axios.get(apiurl,{
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
}


export const SaveCategory=async (data:SaveCategoryRequest)=>{
    const apiurl="http://localhost:5237/api/Category/SaveCategory";
    
    try {
        const response=await axios.post(apiurl,data,{
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
}


export const DeleteCategory=async (data1:Category)=>{
    const apiurl="http://localhost:5237/api/Category/DeleteCategory";
    const data={
      id:data1.categoryId
    }
    try {
        const response=await axios.post(apiurl,data,{
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
}
