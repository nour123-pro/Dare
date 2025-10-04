import { useEffect, useState } from "react";
import { CartProvider } from "../Contexts/CartContext";
import Cart from "./Cart";
import Footer from "./Footer";
import NavBar from "./NavBar";
import BrandHero from "./BrandHero";
import { Brand } from "../interfaces/BrandInterface";
import { brands } from "../data/Data";
import { useLocation } from "react-router-dom";
import { FetchBrandById } from "../data/BrandServices";

export default function SingleBrandPage() {
  const [showcart, setshowcart] = useState<boolean>(false);
  const [brandselect, setbrand] = useState<Brand | undefined>(undefined);
  
  // Use useLocation to access the state passed via navigate
  const location = useLocation();
  const { brandselectedid } = location.state || {}; // Access the brandselectedid from state
 // const loadbranddata=(brandid:string)=>{
   //  const reponse=await     
  //}; 
  // Function to find and set the brand based on the selected ID
  const handlestarter = async () => {
    if (brandselectedid) {
      //const brandneeded = brands.find(
        //(brand) => brand.brandId === brandselectedid
      //);
      const loadedbrand=await FetchBrandById(brandselectedid);
      if (loadedbrand) {
        setbrand(loadedbrand);
      } else {
        alert("Brand not found");
      }
    }
  };

  // UseEffect to run when brandselectedid changes
  useEffect(() => {
    if (brandselectedid) {
      handlestarter();
    }
  }, [brandselectedid]); // Dependency array makes sure the effect runs when brandselectedid changes

  if (!brandselect) {
    return <div>Loading...</div>; // Show loading state while the brand is being fetched
  }

  return (
    <CartProvider>
      <NavBar toggle={() => setshowcart(prev => !prev)} />
      <Cart show={showcart} onClose={() => setshowcart(false)} />
      <BrandHero brandfeatured={brandselect} />
      <Footer />
    </CartProvider>
  );
}
