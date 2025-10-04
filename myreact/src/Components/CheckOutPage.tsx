import { useEffect, useState } from "react";
import { Product } from "../interfaces/ProductInterface";
import { CartProvider, useCart } from "../Contexts/CartContext";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { FetchBrandById } from "../data/BrandServices";
import { Brand } from "../interfaces/BrandInterface";
import BrandHero from "./BrandHero";
import Cart from "./Cart";
import CheckOut from "./CheckOut";

export default function CheckOutPage(){
    const [showcart, setshowcart] = useState<boolean>(false);
    const[products,setProducts]=useState<Product[]>([]);
    const data=useCart();
    useEffect(()=>{
        console.log("data added",data.cartItems);
        if(data.cartItems!=null && data.cartItems.length>=1){
            setProducts(data.cartItems);
        }
    }, [data.cartItems]);
    
   
  
   
  
    return (
      <>
        <NavBar toggle={() => setshowcart(prev => !prev)} />
        <Cart show={showcart} onClose={() => setshowcart(false)} />
         <CheckOut products={products} ></CheckOut>
        <Footer />
        </>
    );
};
