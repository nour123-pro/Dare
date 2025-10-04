import { useEffect, useState } from "react";
import { Product } from "../interfaces/ProductInterface";
import { categories, products } from "../data/Data";

import ProductDiv from "./Product";
import '../assets/ProductMenucss.css'
import { Category } from "../interfaces/CategoryInterface";
import axios from "axios";
import { fetchProducts, ProductsData } from "../data/ProductServices";

export default function ProductMenu(){
    const [productsState, setProductsState] = useState<Product[]>([]);
    const[categoriesstated,setcategory]=useState<Category[]>();
    const[filteredproducts,setfilteredproducts]=useState<Product[]>([]);
    const filteringbasedoncategory=(id:string)=>{
       const filteredproducts= productsState.filter((product=>product.categoryId==id));
       setfilteredproducts(filteredproducts);
    };
    const  loadProducts=async ()=>{
       
        try {
            const response=await fetchProducts();
            if(response!=null){
                setfilteredproducts(response);
                setProductsState(response);
            }
          

           
                
           
            
    
        } catch (error) {
            alert(error)
        }
    };
 
    
    useEffect(() => {
       // setProductsState(products);
        setcategory(categories);
        //setfilteredproducts(products);
        loadProducts();

        
    },[]);
    return (

        <div className="Menu">
            <div className="ProductMenuText">
                Take Look At Our <br /> New Products
            </div>
            <div className="fullwidth">
            {categoriesstated?.map((categroy)=>(
               <button key={categroy.categoryId} className="button-2" style={{backgroundColor:categroy?.categoryColor}} onClick={()=>filteringbasedoncategory(categroy.categoryId)} >{categroy.categoryName}</button>
            ))}
            </div>

            <div className="ProductMenu" >
            {filteredproducts.map((product) => (
                <ProductDiv  productselected={product}  />
            ))}
            </div>
        </div>
    );
}