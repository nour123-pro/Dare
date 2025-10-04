import { useDebugValue, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Product } from "../interfaces/ProductInterface";
import { fetchProducts } from "../data/ProductServices";
import ProductMain from "./Hero3";
import '../assets/AdminPanel.css'
import { Category } from "../interfaces/CategoryInterface";
import { IoEllipseSharp } from "react-icons/io5";
import { DeleteCategory, fetchCategories } from "../data/CategoryServices";
import { Brand } from "../interfaces/BrandInterface";
import { FetchBrands } from "../data/BrandServices";
import { fetchAccounts, fetchOrders, fetchReviews } from "../data/AdminServices";
import { Account, AccountsAdminPanel } from "../interfaces/AccountInterface";
import { Order, Review } from "../interfaces/ReviewInterface";
import ProductTable from "./ProductTable";
import CategoryTable from "./CategoryTable";
import BrandTable from "./BrandTable";
import ReviewTable from "./ReviewTable";
import OrderTable from "./OrderTable";

export default function AdminPanel(){
 
    const[categories,setcategories]=useState<Category[]>();
    const[active, setActive] = useState<boolean>(false);
    const[brands,setbrands]=useState<Brand[]>();
    const[count,setcount]=useState<number>(0);
    const[accounts,setaccounts]=useState<AccountsAdminPanel[]>();
    const[Reviews,setreviews]=useState<Review[]>();
    const[orders,setorders]=useState<Order[]>([]);
    const[products,setProducts]=useState<Product[]>([]);
    const[femalescountorder,setfemalecountorders]=useState<number>(0);
    const[malecountorder,setmalecountorder]=useState<number>(0);
    const[DeliveredOrders,setDeliveredOrders]=useState<number>(0);
    const[PendingOrders,setPendingOrders]=useState<number>(0);
  
    const GetCategories=async ()=>{
      const data=await fetchCategories();
      if(data){
        setcategories(data);
      }else{
        console.log('error in fetching categories')
      }
      
    };
    const GetBrands=async()=>{
        const data=await FetchBrands();
         if(data){
          setbrands(data);
         }else{
          console.log('error in fecthing brands');
         }
    };
    const GetAccounts=async ()=>{
       const data=await fetchAccounts();
       if(data){
        setaccounts(data);
       }else{
        console.log("Error in fetching Accounts");
       }
    };
    const GetReviews=async ()=>{
      const data=await fetchReviews();
      if(data){
        setreviews(data);
      }
      
    };
    const GetProducts=async ()=>{
       const data=await fetchProducts();
       if(data){
        setProducts(data);
       }
       

    };
    const GetOrders=async ()=>{
      const data=await fetchOrders();
      if(data){
        setorders(data);
        CalculatingOrdersStat(data);
      }
    }

    const CalculatingOrdersStat=(data:Order[])=>{
      let males=0;
      let females=0;
      let deorders=0;
      let pendingorders=0;
      data.forEach(order => {
        if(order.gender==0){
         males+=1;
        }else{
          females+=1;
        }
        if(order.isDelievered==true){
           deorders+=1;
        }
        if(order.isDelievered==false && order.isAccepted==true){
            pendingorders++;
        }
      });
      setfemalecountorders(females);
      setmalecountorder(males);
      setDeliveredOrders(deorders);
      setPendingOrders(pendingorders);

    }


    useEffect(()=>{
      const fetchData = async () => {
       
        await GetCategories();
        await GetBrands();
        await GetAccounts();
        await GetReviews();
      await GetProducts();
      await  GetOrders();
        
      };
      fetchData();
    },[]);

    useEffect(()=>{
      const fe=async ()=>{
        await GetOrders();
      };
      fe();
      
     
    },[GetOrders, orders])
    return (
    <>
    

<div className="container2">

<div className="leftside">
  
    <nav className="nav2">
      <ul>
        <li className={active ? "active" : ""} onClick={() => setActive(!active)}><a href="#">Welcome Admin <i className="fi fi-tr-admin-alt"></i></a></li>
       
        <li  className={active ? "active" : ""} onClick={() => setActive(!active)}><a href="#">  <i className="fi fi-tr-box-open " style={{margin:'5px'}}></i> Orders</a></li>
      
      </ul>
    </nav>

    

</div>

<div className="rightside flex-colomn">
{active ? (
  <>
    <div className="flex-row" style={{ flexWrap: 'wrap', margin: '12px' }}>
      <div className="card"><p className="font1">{products.length}</p> <p className="font2">Products</p> <i className="fi fi-tr-box-open" style={{ margin: '5px' }}></i></div>
      <div className="card"><p className="font1">{categories?.length}</p> <p className="font2">Categories</p> <i className="fi fi-tr-category" style={{ margin: '5px' }}></i></div>
      <div className="card"><p className="font1">{brands?.length}</p> <p className="font2">Brands</p> <i className="fi fi-tr-brand" style={{ margin: '5px' }}></i></div>
      <div className="card"><p className="font1">{orders?.length}</p> <p className="font2">Orders</p> <i className="fi fi-tr-box-open" style={{ margin: '5px' }}></i></div>
      <div className="card"><p className="font1">{Reviews?.length}</p> <p className="font2">Reviews</p> <i className="fi fi-tr-order-history" style={{ margin: '5px' }}></i></div>
    </div>
    <div className="content">
      <ProductTable categories={categories} brands={brands} />
      <CategoryTable categories={categories} />
      <BrandTable />
      <ReviewTable />
    </div>
  </>
) : (
  <div className="orders">
    <div className="flex-row" style={{ flexWrap: 'wrap', margin: '12px',justifyContent:'space-around' }}>
      <div className="card"><p className="font1">{malecountorder}</p> <p className="font2">Ordered By Males</p> <i className="fi fi-tr-mars" style={{ margin: '5px' }}></i></div>
      <div className="card"><p className="font1">{femalescountorder}</p> <p className="font2">Ordered By Female</p> <i className="fi fi-tr-venus" style={{ margin: '5px' }}></i></div>
      <div className="card"><p className="font1">{DeliveredOrders}</p> <p className="font2">Delivered Orders</p> <i className="fi fi-tr-shipping-timed"></i></div>

      <div className="card"><p className="font1">{PendingOrders}</p> <p className="font2">Pending Orders</p> 
      <i className="fi fi-tr-pending"></i>
      </div>
      </div>
      <OrderTable ></OrderTable>
  </div>
)}

 
</div>
</div>



   

    </>
    )
}