import type { Product } from "../interfaces/ProductInterface";
import fallbackImage from "../assets/images/product1-removebg-preview.png";
import { useEffect, useState } from "react";
import { useCart } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductDiv({productselected}:{productselected:Product}){
    const[addtocard,setaddtocart]=useState<boolean>(false);
    const[iconcolor,seticoncolor]=useState<string>();
    const {addToCart}=useCart();
    const addedtocardicon="fi fi-rr-shopping-cart-check";
    const notaddedtocardicon="fi fi-tr-add";
    const navigate = useNavigate();
    const productImage =
    Array.isArray(productselected.productImages) &&
    productselected.productImages.length > 0
      ? `data:image/png;base64,${productselected.productImages[0]}`
      : fallbackImage;
    const HandleAddToCard=()=>{
        setaddtocart(true);
        if(addtocard){
            seticoncolor(notaddedtocardicon);
            setaddtocart(false);
           
            
        }else{
            seticoncolor(addedtocardicon);
            setaddtocart(true);
           addToCart(productselected)
           
        }

    };
    const HandleClick=()=>{
      try {
        navigate("/Dare", { state: {productselectedid: productselected.productId } });
        window.location.reload();
        console.log("Selected item:", productselected.productId);
      } catch (error) {
       
        console.log(error)
      }
 
    }
    useEffect(()=>{
      seticoncolor(notaddedtocardicon);
    },[addedtocardicon]);
    return(
        <div className="Product">
             <span className="productname"  onClick={()=>HandleClick()} > {productselected?.productName}</span>
             <span className="productcategory" >
                {productselected?.category?.categoryName}
             </span>
             <span className="Stars">
             <span className="Stars">
  {Array(5)
    .fill(0)
    .map((_, index) => (
      <span
        key={index}
        style={{
          color: index < productselected?.rating ? "#FFD700" : "#D3D3D3",
          fontSize: "1.2rem",
        }}
      >
      {index < productselected?.rating ? "★" : "☆"}

      </span>
    ))}
</span>

             </span>
             <span className="productDescription">{productselected?.productDescription}</span>
             <span
  className="productImage"
 
>
  <img
    src={productImage}
    alt="Product Image"
    style={{
      display: "block",
     
    }}
  />

  <span
    className="AddProduct"
   
  >
    <i className={iconcolor}  onClick={()=>HandleAddToCard()}></i>
  </span>
</span>

             <span className="productprice">
               
             <i>{productselected.productPrice}</i>
                <i className="fi fi-tc-dollar"> </i>
                
             </span>
        </div>
    )
}