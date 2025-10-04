// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState, useSyncExternalStore } from 'react';
import '../assets/navbar.css'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Cart from './Cart';
import { Brand } from '../interfaces/BrandInterface';
import { brands } from '../data/Data';
import DropdownSelect from './DropdownSelect';
import DropdownItem from '../interfaces/types';
import BrandsDropdown from './BrandsDropdown';
import axios from 'axios';
import { Product } from '../interfaces/ProductInterface';
import { FetchBrands } from '../data/BrandServices';
export default function NavBar({toggle}:{toggle:()=>void}){
     const setChosen = (event: React.MouseEvent<HTMLElement>) => {
          const target = event.currentTarget as HTMLElement;
       if(target.classList.contains('selected')){
       target.classList.remove('selected');
       }else{
          target.classList.add('selected');
       }
        
     }
     const[brandsfeatured,setbrands]=useState<Brand[]>([]);
     const[dropdownitems,setdropdownitems]=useState<DropdownItem[]>([]);
     const[usernameloged,setusername]=useState<string>();
     const[brandsdata,setbranddata]=useState<Brand[]>([]);
     const CreatingDropDown=()=>{
      const newarray: DropdownItem[] = [];
          brandsdata.forEach((brand: Brand) => {
            const newitem: DropdownItem = {
              id: brand.brandId,
              label: brand.brandName,
              value: brand,
            };
            newarray.push(newitem);
          });
          setdropdownitems(newarray);
     };
     const loadData=async ()=>{
        const reponse=await  FetchBrands();
        if(reponse!=null){
          setbranddata(reponse);
        
        }
     };
     useEffect(()=>{
         loadData();
        
         const username= localStorage.getItem("username");
         if(username!=null){
setusername(username);
         }


     },[]);
     useEffect(() => {
      if (brandsdata.length > 0) {
        CreatingDropDown();
      }
    }, [brandsdata]);
    
     
    const[menuopen,setopen]=useState<boolean>(false);
  const  toggleDropdown=()=>{
          setopen(prev=>!prev)
  };

     return (
      <div className="navbar">
      <div className="brandlogo">
        <p>Dare</p>
        <img src="src/assets/images/logo.png" alt="Brand Logo" />
      </div>
    
   
    
  

      <div className={`navelements ${menuopen ? 'show' : ''}`}>
        <div className="icondiv1">
          <a href="/">
          <p onClick={setChosen}>Products</p>
          </a>
         
        </div>
        <div className="icondiv1">
          <p onClick={setChosen}>Test</p>
        </div>
        <div className="icondiv1">
          <BrandsDropdown dropitems={dropdownitems}></BrandsDropdown>
        </div>
      </div>
    
      <div className={`navusericons ${menuopen ? 'show' : ''}`}>
        <div className="icondiv cart1 usericon">
          <i className="fi fi-tc-shopping-cart" onClick={toggle}></i>
        </div>
        
        <div className="icondiv usericon">
          <i className="fi fi-tr-search-heart cart"></i>
        </div>
        {usernameloged?(
          <div className="usericon bigger">
          <i>{ usernameloged.charAt(0).toUpperCase()}</i>
        </div>
        ):(
<div className="icondiv usericon">
          <a href="/Welcome">
            <i className="fi fi-ts-sign-in-alt cart"></i>
          </a>
        </div>
        )}
        
      </div>
      </div>
   
    
     );
}