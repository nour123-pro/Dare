import axios from "axios";
import { AccountsAdminPanel } from "../interfaces/AccountInterface";
import { Order, Review } from "../interfaces/ReviewInterface";

export const fetchAccounts=async()=>{
    const apiurl="http://localhost:5237/api/User/GetAccounts";
    try {
        const response=await axios.get<AccountsAdminPanel[]>(apiurl,{
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

export const fetchReviews=async ()=>{
    const apiurl="http://localhost:5237/api/Review/ReviewAll";
    try {
        const response=await axios.get<Review[]>(apiurl,{
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

export const fetchOrders=async ()=>{
    const apiurl="http://localhost:5237/api/Order/AllOrders";
    try {
        const response=await axios.get<Order[]>(apiurl,{
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }
      
            
        )
        if(response.status==200){
           
            return  response.data;
          
           
        }else{
           console.log("error in fetching orders");
        }

    } catch (error) {
        console.log(error)
    }
};



export const EditReview = async (review: Review) => {
  const apiUrl = "http://localhost:5237/api/Review/EditingReview";

  const payload = {
    reviewId: review.reviewId,
    accountId: review.accountId,
    productId: review.productId,
    reviewContent: review.reviewContent,
    ratingNumber: review.ratingNumber,
    isDeleted: review.isDeleted,
    createdAt: review.createdAt
  };
  console.log("Payload for EditReview:", payload);
  try {
    const response = await axios.post(apiUrl, payload, {
      headers: {
        "Accept":"application/json",
                "Content-Type":"application/json"
      }
    });
    console.log("Response from EditReview:", response);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Error editing review:", response.statusText);
    }
  } catch (error) {
    console.error("Error in EditReview:", error);
  }
};


