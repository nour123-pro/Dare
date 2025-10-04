import { Product } from "../interfaces/ProductInterface";
import "../assets/SingleBrand.css"
import {  products, sampleReviews } from "../data/Data";
import { useEffect, useState } from "react";
import ProductDiv from "./Product";
import { useNavigate } from "react-router-dom";
import { Brand } from "../interfaces/BrandInterface";
import { FetchBrands } from "../data/BrandServices";
import { Review } from "../interfaces/ReviewInterface";
import { useCart } from "../Contexts/CartContext";
import { SendReview, SendReview2 } from "../data/UserServices";
import Popup from "./Popup";
import { fetchProductReviewsByProductId, fetchProducts } from "../data/ProductServices";
import { fetchCategories } from "../data/CategoryServices";
import { Category } from "../interfaces/CategoryInterface";
interface ProductHeroProps {
    productselected: Product | null; // allow null to safely handle loading
}

export default function ProductHero({ productselected }: ProductHeroProps) {
    const[filteredproducts,setfilteredproducts]=useState<Product[]>([]);
    const[brands,setbrands]=useState<Brand[]>([]);
    const[reviews,setreviews]=useState<Review[]>([]);
    const[count,setcount]=useState(1);
    const[addtocart,setaddtocart]=useState<boolean>(false);
    const[showmessage,setshow]=useState<boolean>(false);
    const[review,setreview]=useState<string>('');
    const[label,setlabel]=useState<string>();
    const[message,setmessage]=useState<string>();
    const[categories,setcategories]=useState<Category[]>([]);
    const [rating, setRating] = useState(0);
const [hoverRating, setHoverRating] = useState(0);

     const {addToCart,removeFromCart,updateProductQuantity}=useCart();
    
    const navigate=useNavigate();
    const getbrands=async ()=>{
        const bran=await FetchBrands();
        if(bran!=null){
            setbrands(bran);
        }
        
    }
    const HandleAddedToCart=()=>{
      if(addtocart==true && productselected!=null){
        setaddtocart(false);
       removeFromCart(productselected.productId)
      }
      if(productselected!=null && addtocart==false){
        setaddtocart(true);
        addToCart(productselected);
        updateProductQuantity(productselected.productId,count);
      }
       
    };

    const HandleStarClicking=(num: number)=>{
        setRating(num+1);
    }
    const HandleReviewSubmit=async (e: { preventDefault: () => void; } | undefined)=>{
      e?.preventDefault();
     
      if(review!=null && productselected!=null && rating!=null){
        try {
             const reponse=await SendReview2(review,productselected?.productId,rating);
             
             if(reponse.success){
                 setmessage(reponse.message);
                 setlabel("Successfully");
                const newdata=await fetchProductReviewsByProductId(productselected.productId);
                if(newdata){
                  setreviews(newdata);
                  setreview('');
                  setRating(0);
                }
                
                 setshow(true);
                

             }


        } catch (error) {
          alert(error);
        }
      }
    }
    const getbrandproducts=async ()=>{
           const data=await fetchProducts();
           const wanted=data?.filter((produc)=>produc.brandId==productselected?.brandId);
           if(wanted){
            setfilteredproducts(wanted);
           }
           const data2=await fetchCategories();
           if(data2){
             setcategories(data2);
           }
           
         }

        const GetProductReviews=async ()=>{
          if(productselected!=null){
            const data=await fetchProductReviewsByProductId(productselected?.productId);
           console.log(data);
            if(data){
              await setreviews(data);
              console.log(reviews);
            }else{
              alert("errro in seting reviews");
            }
          }
         
         };
    useEffect(()=>{
        getbrandproducts();
        getbrands();
        //setreviews(sampleReviews);
        GetProductReviews();
        console.log(productselected)
       
      },[]);
    if (!productselected) {
        return <div className="Center">Loading product...</div>;
    }


    return (
         <div className="flex-colomn divcenter">
               
      <div className="wrapper">
                 <div className="div1 flex-row">
                   <div className="image">
                     <img src={productselected.productImages &&productselected.productImages.length>1?productselected.productImages[0]:'src/assets/images/product1-removebg-preview.png'} alt="" />
                      
                   </div>
                   <div className="brandinfo" >
                    <div className="productReviews">50% Off</div>
                   <span className="brandtext brandquote ">{productselected?.category?.categoryName}</span>
        <span className="brandtext brandname productname">{productselected.productName}</span>
        <span className="brandtext brandname productname">{productselected.brand?.brandName}</span>
      
       
        <span className="Stars2">
             <span className="Stars">
  {Array(5)
    .fill(0)
    .map((_, index) => (
      <span
        key={index}
        style={{
          color: index < productselected?.rating ? "#FFD700" : "#D3D3D3",
          fontSize: "1.2rem",
        }
       
      }
      onClick={() => HandleStarClicking(index)}
      >
      {index < productselected?.rating ? "★" : "☆"}

      </span>
    ))}
    
</span>
<span className="productReviews">{reviews.length} reviews</span>

             </span>
            
             <span className="brandtext branddescription bigger">{productselected.productDescription}</span>
             {productselected.productprice ? (
    <span className="price icontext">{productselected.productprice} heree</span>
    
) : (
    <div className="price-wrapper">
    <span className="price icontext">
      43 <i className="fi fi-tc-dollar"></i>
    </span>
  </div>


  
)}
<div className="flex-row2">
  {addtocart==false?(
    <div className="addtocartbutton" onClick={()=>HandleAddedToCart()}>
        Add to cart
    </div>
  ):(
    <div className="addtocartbutton checked" onClick={()=>HandleAddedToCart()}>
    Added to cart <i className="fi fi-tr-shield-trust"></i>
</div>
  )}

<div className="buttoncount">
    
    <span className="increase" onClick={()=>{setcount(prev=>prev+1);updateProductQuantity(productselected.productId,count)}}>
    <i className="fi fi-tr-add"></i>
    </span>
    <span className="count">{count}</span>
    <span className="decrease" onClick={()=>{setcount(prev=>prev-1);updateProductQuantity(productselected.productId,count)}}>
    <i className="fi fi-tr-minus-circle"></i>
    </span>
</div>
</div>


<div className="alerts">
    <span className="price-wrapper alert">
    <i className="icontext fi fi-tr-shipping-fast"></i>
   
    Free shipping on orders over $50
    </span>
</div>

                     </div>

                    
      <div className="divleft animated-sidebar">
        <ul className="brand-nav">
          {brands.map((brand) => (
            <li 
              key={brand.brandId}
              className="brand-nav-item"
              onClick={() =>{
                navigate("/brand", { state: { brandselectedid: brand.brandId } });
                window.location.reload();
              }
             
              }
              style={
              productselected?.brand?.brandId === brand.brandId ? {
                  transform: "scale(1.2)",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", /* Add a shadow for depth */
                  transition: "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease" /* Smooth transition */
              } : {}
          }
             
            >
              <img src={brand.brandImage} alt={brand.brandName} className="brand-nav-img" />
              <span className="brand-nav-name">{brand.brandName}</span>
            </li>
          ))}
        </ul>
      </div>

      
      
      
                 </div>

                 <div className="moreinfo">
                        <div className="bar">
                            <span>Description</span>
                            <span>ingredients</span>
                            <span>Reviews</span>
                        </div>
                        <div className="dataselected">
                            <div className="Descriptionhero">{productselected.productDescription}</div>
                            <div className="ingredients">
  <span className="ingredient">Water</span>
  <span className="ingredient">Glycerin</span>
  <span className="ingredient">Niacinamide</span>
  <span className="ingredient">Hyaluronic Acid</span>
  <span className="ingredient">Ceramides</span>
</div>

<div className="reviews">

{Array.isArray(reviews) && reviews.length > 0 ? (
  reviews.map((review, idx) => (
    <div key={idx} className="review">
      <div className="starsrating">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <span
              key={index}
              style={{
                color: index < Number(review.ratingNumber) ? "#FFD700" : "#D3D3D3",
                fontSize: "1.2rem",
              }}
            >
              {index < review.ratingNumber ? "★" : "☆"}
            </span>

          ))}
          {review.ratingnumber}
        <small>
          {review.createdAt} | {new Date(review.createdAt).toLocaleDateString()}
        </small>
      </div>
      <div>{review.reviewContent}</div>
    </div>
  ))
) : (
  <span>No Reviews</span>
)}



<div className="inputcomment">
  {/* ⭐ Star Rating */}
  <div className="stars" style={{ display: "flex", gap: "5px", marginRight: "10px" }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <i
        key={star}
        className={`fi ${(hoverRating || rating) >= star ? "fi-ss-star" : "fi-rs-star"}`}
        onClick={() => setRating(star)}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        style={{ cursor: "pointer", fontSize: "20px", color: "#FFD700" }}
      ></i>
    ))}
  </div>

  {/* 💬 Input */}
  <input
    type="text"
    onChange={(event) => setreview(event.target.value)}
    placeholder="Your Review Shapes Our Work"
    value={review}
  />

  {/* 🚀 Submit */}
  <span onClick={() => HandleReviewSubmit()}>
    <i className="fi fi-tr-paper-plane-top"></i>
  </span>

  {/* 🔔 Popup */}
  <Popup
    show={showmessage}
    onClose={() => setshow((prev) => !prev)}
    label={label}
    message={message}
  />
</div>



  
 
</div>

                        </div>
                     </div>
                     </div>
                 <div className="flex-row divbottom">
                  <div className="flex-colomn formaltedfor">
                      <span>Formalted for</span>
                      <span>Melanin-Rich Skin</span>
                      <i className="fi fi-tr-night-day"></i>
                  </div>
                  <div className="flex-colomn formaltedfor">
                      <span>Formalted for</span>
                      <span>Melanin-Rich Skin</span>
                      <i className="fi fi-rs-raindrops"></i>
                  </div>
                  <div className="flex-colomn formaltedfor">
                      <span>Formalted for</span>
                      <span>Melanin-Rich Skin</span>
                      <i className="fi fi-rs-umbrella-beach"></i>
                  </div>
                  <div className="flex-colomn formaltedfor">
                      <span>Formalted for</span>
                      <span>Melanin-Rich Skin</span>
                      <i className="fi fi-rs-umbrella-beach"></i>
                  </div>
                 </div>
      
      
                 <div className="flex-colomn brandmore talk">
                   <span>Why {productselected.productName}</span>
                   <span className="brandname bright">
                   MORE THAN 40% OF AMERICANS IDENTIFY AS PEOPLE OF COLOR
                   </span>
                   <div className="flex-row brandmore">
                    <span className="branddescription more">
                    Most hrands are not formilatad to address the unique skincare needs of
      this very diverse group.-While People of
      Colar snand maro an ckinsara than thol
      products that meet their needs
      <span className="border"></span>
                    </span>
                    <div className="divimage">
                      <img src="src/assets/images/productmain2.jpg" alt="" />
                    </div>
                    <div className="divimage special">
                      <img src="src/assets/images/productmain2.jpg" alt="" />
                    </div>
                   </div>
      
                   <div className="flex-row brandmore">
                   <div className="divimage  special">
                      <img src="src/assets/images/productmain2.jpg" alt="" />
                    </div>
                    <div className="divimage">
                      <img src="src/assets/images/productmain2.jpg" alt="" />
                    </div>
                    <span className="branddescription more">
                    Most hrands are not formilatad to address the unique skincare needs of
      this very diverse group.-While People of
      Colar snand maro an ckinsara than thol
      products that meet their needs
      <span className="border"></span>
                    </span>
                    
                   </div>
                 </div>
      
                 <div className="flex-colomn brandmore">
      
                  <span className="brandname2">Our Products {productselected.brand?.brandName}</span>
                  <span className="flex-row filterbar">
                    
                    <div className="flex-row elements">
                   
                    </div>
                     
      
                  </span>
                   <div className="ProductMenu" >
                  
                
                 
      
                              {filteredproducts.map((product) => (
                                  <ProductDiv  productselected={product}  />
                              ))}
                              </div>
                 </div>

                 
              </div>
             
    );
}
