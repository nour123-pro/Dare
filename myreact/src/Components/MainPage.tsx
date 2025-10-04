import { useState } from "react";
import { CartProvider } from "../Contexts/CartContext";
import Cart from "./Cart";
import FeaturedBrands from "./FeaturedBrands";
import Footer from "./Footer";
import HeroWow from "./HeroAgain";
import NavBar from "./NavBar";
import NewsPaper from "./NewsPaper";
import ProductMenu from "./ProductMenu";
import UnderHero from "./UnderHero";

export default function MainPage(){
    const[showcart,setshowcart]=useState<boolean>(false);
    return(
         <CartProvider>
            <NavBar toggle={()=>setshowcart(prev=>!prev)}></NavBar>
            
           <HeroWow></HeroWow>
          
           <UnderHero></UnderHero>
          
           <ProductMenu></ProductMenu>
           <Cart show={showcart} onClose={()=>setshowcart(false)}></Cart>
           <FeaturedBrands></FeaturedBrands>
          <NewsPaper></NewsPaper>
       
          
       
          <Footer></Footer>
           </CartProvider>
    );
}