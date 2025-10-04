import axios from "axios";
import { data } from "react-router-dom";
import { Address, Order } from "../interfaces/ReviewInterface";
import { OrderCreateRequest } from "../Components/CheckOut";


export const CancelOrder=async (order:Order)=>{
    const apiurl="http://localhost:5237/api/Order/CancelOrder";
    const data={
        Id:order.orderId
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
            console.log("error in Canceling Order");
        }

    } catch (error) {
        console.log(error);
    }
};


export const ConfirmOrder=async (order:Order)=>{
    const apiurl="http://localhost:5237/api/Order/ConfirmOrder";
    const data={
        Id:order.orderId
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
            console.log("error in Canceling Order");
        }

    } catch (error) {
        console.log(error);
    }
};

export const ConfirmOrderDelivery=async (order:Order)=>{
    const apiurl="http://localhost:5237/api/Order/ConfirmOrderDelivery";
    const data={
        Id:order.orderId
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
            console.log("error in Canceling Order");
        }

    } catch (error) {
        console.log(error);
    }
};


export const PlaceOrder=async (data:OrderCreateRequest)=>{
    const apiurl="http://localhost:5237/api/Order/CreateOrder";
   
   const s=localStorage.getItem("UserId");
    if(s==null){
        alert("Please Login in to place order");
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
            console.log("error in Canceling Order");
        }

    } catch (error) {
        console.log(error);
    }
};


