import { Brand } from "../interfaces/BrandInterface";

import "../assets/SingleBrand.css"
import { brands, categories, products } from "../data/Data";
import { useNavigate } from "react-router-dom";
import ProductDiv from "./Product";
import { useEffect, useState } from "react";
import { Category } from "../interfaces/CategoryInterface";
import { Product } from "../interfaces/ProductInterface";
import { fetchProducts } from "../data/ProductServices";
import { fetchCategories } from "../data/CategoryServices";
export default function BrandHero({brandfeatured}:{brandfeatured:Brand}) {
  const navigate=useNavigate();
  const[categ,setcategories]=useState<Category[]>([]);
  const[brandproducts,setbrandproducts]=useState<Product[]>([]);
      const[filteredproducts,setfilteredproducts]=useState<Product[]>([]);
      const filteringbasedoncategory=(id:string)=>{
         const filteredproducts= brandproducts.filter((product=>product.categoryId==id));
         setfilteredproducts(filteredproducts);
      };
      const getbrandproduct=async ()=>{
        const data=await fetchProducts();
        const wanted=data?.filter((product)=>product.brandId==brandfeatured.brandId);
        if(wanted){
          setbrandproducts(wanted);
        }
        const data2=await fetchCategories();
        if(data2){
          setcategories(data2);
        }
        
      }
     

      useEffect(() => {
        // Fetch brand products only when brandfeatured changes
        getbrandproduct();
        setcategories(categories);
       
    }, [brandfeatured]); // Only depends on brandfeatured
    
    useEffect(() => {
      // Set filtered products after fetching brand products
      setfilteredproducts(brandproducts);
    }, [brandproducts]); // Only update filtered products when brand products change
  
    
    return (
        <div className="flex-colomn divcenter">
         

           <div className="div1 flex-row">
             <div className="image9">
               <img src={"src/assets/images/logo3-removebg-preview.png"} alt="" />
                
             </div>
             <div className="brandinfo" >
             <span className="brandtext brandquote">Skin care for {brandfeatured.brandName}</span>
  <span className="brandtext brandname">{brandfeatured.brandName}</span>

  <span className="brandtext branddescription">{brandfeatured.brandDescription}</span>
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
        brandfeatured.brandId === brand.brandId ? {
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
             <span>Why {brandfeatured.brandName}</span>
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

            <span className="brandname2">Our Products</span>
            <span className="flex-row filterbar">
              
              <div className="flex-row elements">
              {categ?.map((categroy)=>(
               <button key={categroy.categoryId} className="button-2" style={{backgroundColor:categroy.categoryColor}} onClick={()=>filteringbasedoncategory(categroy.categoryId)} >{categroy.categoryName}</button>
            ))}
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
};