import { useState } from "react";
import { Brand } from "../interfaces/BrandInterface";
import { brands } from "../data/Data";
import "../assets/featuredbrands.css"
export default function FeaturedBrands(){
    const[brandsoffered,setbrands]=useState<Brand[]>(brands)
    return(
     <div className="featuredbrandsdiv">
      {brandsoffered.map((product) => (
         <img src={product.brandImage ? product.brandImage : 'src/assets/images/logo.png'} />
      ))}
     </div>
    );
}