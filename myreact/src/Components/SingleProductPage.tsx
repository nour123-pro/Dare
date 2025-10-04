import { useLocation } from 'react-router-dom';
import '../assets/SingleProductPage.css'
import { useEffect, useState } from 'react';
import { Product } from '../interfaces/ProductInterface';
import { fetchProductById } from '../data/ProductServices';
import NavBar from './NavBar';
import ProductHero from './ProductHero';
import { CartProvider } from '../Contexts/CartContext';
import Cart from './Cart';
import Footer from './Footer';


export default function SingleProductPage(){
    const location = useLocation();
    const [showcart, setshowcart] = useState<boolean>(false);
    const[productselected,setproductselected]=useState<Product>();
  const { productselectedid } = location.state || {}; // Access the brandselectedid from state
  const getproduct=async ()=>{
    const result=await fetchProductById(productselectedid);
    if(result!=null){
        setproductselected(result);
    }else{
        console.log("no found productid in system");
    }
  }
  useEffect(()=>{
    getproduct();
    console.log(productselected);
  },[]);
    return(
     <>
      <CartProvider>
            <NavBar toggle={() => setshowcart(prev => !prev)} />
            <Cart show={showcart} onClose={() => setshowcart(false)} />
              {productselected?(
                <ProductHero productselected={productselected}></ProductHero>
              ):(
                ''
              )}
          
            <Footer />
          </CartProvider>

      </>
           
            
      
     
);
}