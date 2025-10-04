import { useEffect, useState } from "react";
import { Product, ProductCreateRequest } from "../interfaces/ProductInterface";
import { createProduct, DeleteProduct, fetchProducts } from "../data/ProductServices";
import FormPop from "./FormPop";
import { Category } from "../interfaces/CategoryInterface";
import { Brand } from "../interfaces/BrandInterface";
import ConfirmDelete from "./ConfirmDelete";
import { FaS } from "react-icons/fa6";
import { CreateOrEditReview, EditReview, fetchReviews } from "../data/AdminServices";
import { useStyleRegister } from "antd/es/theme/internal";
import { Review } from "../interfaces/ReviewInterface";
import { message } from "antd";
import ReviewPopForm from "./ReviewPopForm";
import { PiHandSwipeLeftDuotone } from "react-icons/pi";

export default function ReviewTable() {
  
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<Review>();
  const [showDelete, setShowDelete] = useState<boolean>(false);
 const[reviews,setreviews]=useState<Review[]>([]);


      const GetReviews=async ()=>{
        const data=await fetchReviews();
        if(data){
          setreviews(data);
        }
        
      };

  useEffect(() => {
    GetReviews();
  }, []);

  const HandleEdit = (review:Review) => {
    setSelectedReview(review);
    setShowForm(true);
  };

  const HandleDelete = (review:Review) => {
    setSelectedReview(review);
    setShowDelete(true);
  };

  const ConfirmDeleteFun = async () => {
    if (!selectedReview) return;
    try {
      const response = await DeleteProduct(selectedProduct.productId);
      if (response?.success === "true") {
        alert(response.message);
        setShowDelete(false); // Ensure this is called after the alert
        GetReviews();
      } else {
        alert(response?.message || "Failed to delete product.");
      }
    } catch (error) {
      alert("Error: " + error);
    } finally {
      setShowDelete(false); // Ensure this is always called, even if an error occurs
    }
  };

  const handleCreateOrUpdate = async (review: Review) => {
    try {
      console.log("📤 Sending review:", review);
      const result = await EditReview(review);
      console.log("✅ Result from EditReview:", result);
  
      alert(result || "No response message received.");
    } catch (error: any) {
      console.error("❌ Error in handleCreateOrUpdate:", error);
      message.error(error?.toString() || "An unexpected error occurred.");
      alert(error?.toString() || "An unexpected error occurred.");
    }
  };
  
  return (
    <>
 


<div className="table" style={{width:'100%'}}>
<table style={{width:'100%'}}>
  <title>Reviews</title>
  <thead>
    <tr>
    <th>Account Name</th>
      <th>ProductName</th>
     
      <th>Brand</th>
      <th>Review Content</th>
      <th>Created At</th>
      
      <th>Actions</th>
      <span className="icon" onClick={() => { setSelectedReview(undefined); setShowForm(true); }}><i className="fi fi-tr-add"></i></span>
    </tr>
    
  </thead>
  <tbody>
  {reviews?.map((review)=>(
    
    <>
      
     <tr key={review.accountId}>
     <td>{review.account.accountName}</td>
      <td>  {review.product?.productName}</td>
      
      <td  className="catname">
        <span >
        {review.product?.brand.brandName}  
          {review.product?.brand?.brandImage?(
            <img src={review.product?.brand?.brandImage.toString()} alt="" />
          ):(
<span className="icon" >

</span>
          )}
        
        </span>
      </td>
   
     
     
    
      <td>{review.reviewContent}</td>
      <td>{review.createdAt}</td>
     {review.product.isDeleted?(
         <td className="icons">
         <span>
       <i className="fi fi-rr-edit"  onClick={() => HandleEdit(review)}></i>
       </span>
      <span>
      <i className="fi fi-rr-cross"  onClick={() => HandleDelete(review)}></i>
      </span>
      </td>
     ):(
        <td className="icons graybackground">
         <span>
       <i className="fi fi-rr-edit"  ></i>
       </span>
      <span>
      <i className="fi fi-rr-cross"  ></i>
      </span>
     </td>
     )};
    
      
     
     
     </tr>
    
    </>
   
     
 ))}
  </tbody>
 
</table>
<ReviewPopForm visible={showForm} brands={[]} categories={[]} onSubmit={handleCreateOrUpdate} onCancel={()=>setShowForm(false)} review={selectedReview}></ReviewPopForm>

      <ConfirmDelete
        show={showDelete}
        onConfirm={ConfirmDeleteFun}
        cancel={() => setShowDelete(false)}
      />
</div>
</>
  );
}
