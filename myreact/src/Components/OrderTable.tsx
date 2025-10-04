import { useState, useEffect } from "react";
import { categories, products } from "../data/Data";
import { fetchProducts, DeleteProduct, createProduct } from "../data/ProductServices";
import { Product, ProductCreateRequest } from "../interfaces/ProductInterface";
import { Order } from "../interfaces/ReviewInterface";
import ConfirmDelete from "./ConfirmDelete";
import FormPop from "./FormPop";
import { fetchOrders } from "../data/AdminServices";
import { CancelOrder, ConfirmOrder, ConfirmOrderDelivery } from "../data/OrderServices";
import Confirm from "./Confirm";

export default function OrderTable(){
    
     const [orders, setorders] = useState<Order[]>([]);
     
       const [selectedorder, setSelectedOrder] = useState<Order>();
       const [showDelete, setShowDelete] = useState<boolean>(false);
       const[showConfirm,setshowconfirm]=useState<boolean>(false);
       const[showConfirmdeleivery,setshowconfirmdelivery]=useState<boolean>(false);
         const GetOrders=async ()=>{
             const data=await fetchOrders();
             console.log(data);
             if(data){
               setorders(data);
              
             }
           }
       
     
      

     
      
     
       const HandleDelete = (order:Order) => {
         setSelectedOrder(order);
         setShowDelete(true);
       };

       const HandleConfirm = (order:Order) => {
        setSelectedOrder(order);
        setshowconfirm(true);
      };

      const HandleConfirmDelievery = (order:Order) => {
        setSelectedOrder(order);
        setshowconfirmdelivery(true);
      };


     
       const ConfirmDeleteFun = async () => {
        if (!selectedorder) return;
        try {
          const response = await CancelOrder(selectedorder);
          alert(response.success);
          if (response.success==true) {
           
           
            const data=await fetchOrders();
            console.log(data);
           
            if(data){
              setorders(data);
              
            }
            
          } else {
            alert(response?.message || "Failed to delete Order.");
          }
        } catch (error) {
          alert("Error: " + error);
        } finally {
          setShowDelete(false); // This is all you need here
          // REMOVE: fetchOrders();
        }
      };

       const HandleConfirmFun=async ()=>{
        if (!selectedorder) return;
        try {
          const response = await ConfirmOrder(selectedorder);
          alert(response.success);
          if (response.success==true) {
           
           
            const data=await fetchOrders();
            console.log(data);
           
            if(data){
              setorders(data);
              
            }
            
          } else {
            alert(response?.message || "Failed to delete Order.");
          }
        } catch (error) {
          alert("Error: " + error);
        } finally {
          setshowconfirm(false); // This is all you need here
          // REMOVE: fetchOrders();
        }
       };


       const HandleConfirmDelieveryFun=async ()=>{
        if (!selectedorder) return;
        alert(selectedorder);
        try {
          const response = await ConfirmOrderDelivery(selectedorder);
          alert(response.success);
          if (response.success==true) {
           
           
            const data=await fetchOrders();
            console.log(data);
           
            if(data){
              setorders(data);
              
            }
            
          } else {
            alert(response?.message || "Failed to delete Order.");
          }
        } catch (error) {
          alert("Error: " + error);
        } finally {
          setshowconfirmdelivery(false); // This is all you need here
          // REMOVE: fetchOrders();
        }
       };
     

       useEffect(() => {
        GetOrders();
       }, []);
     
     
       return (
        <>
        <div className="table" style={{width:'100%'}}>
        <table className="" style={{width:'100%'}}>
            <thead>
            <tr>
        <th>Order Number</th>
        <th>Ordered At</th>
        <th>Price</th>
        <th>Expected Delievery</th>
        <th>Products</th>
        
        
        
        <th>Status</th> 
        <th>Actions</th>
        
    </tr>
            </thead>
            <tbody>
            {orders?.length > 0 ? (
                orders.map((order, index) => ( 
                    <tr key={order?.orderId} className={` ${order.isDeleted === true ? 'block-box' : ''}`}>
                        
                        <td>{index + 1}</td> 
                        <td>{new Date(order?.createdAt).toLocaleDateString()}</td>
                        <td>
                            <span className="price-wrapper2">
                                {order?.totalOrderPrice || '0.0'}
                                <i className="fi fi-tc-dollar"></i>
                            </span>
                        </td>
                        <td>{new Date(order?.expectedDelievery).toLocaleDateString()}</td>
                        
                        {/* Products Column (5) */}
                        <td className="catname">
                            {order?.orderProducts?.map((p) => (
                                <p key={p?.productId}>
                                    {p?.productName} : {p.quantity}
                                </p>
                            ))}
                        </td>
                        
                        {/* Status Column (6) - FIXED JSX */}
                        <td>
                            <span style={{ 
                                background: order.isDelievered 
                                    ? 'blue' 
                                    : !order.isAccepted 
                                        ? 'red' 
                                        : 'green', 
                                padding: '5px', 
                                borderRadius: '4px', 
                                color: 'white' 
                            }}> 
                                {order.isDelievered 
                                    ? 'Delivered' 
                                    : order.isAccepted === false 
                                        ? 'Denied' 
                                        : 'Accepted'}
                            </span>
                            {/* Add another status check, e.g., if (order.isDelievered) */}
                        </td>

                        {/* Actions Column (7) */}
                       
                        <td className={`icons `}>
                            <span style={{ cursor: 'pointer' }}>
                                <i className="fi fi-rr-cross" onClick={() => HandleDelete(order)}> Cancel Order</i>
                            </span>
                            <span style={{ cursor: 'pointer', marginLeft: '10px',whiteSpace:'nowrap' }} >
                                <i className="fi fi-rr-check-circle" onClick={() => HandleConfirm(order)} > Confirm Order</i>
                            </span>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={7} style={{ textAlign: 'center' }}>No orders found.</td> {/* 🎯 FIX: Updated colSpan to 7 */}
                </tr>
            )}
            </tbody>
        </table>
        
        <ConfirmDelete
            show={showDelete}
            onConfirm={ConfirmDeleteFun}
            cancel={() => setShowDelete(false)}
        />
        <Confirm show={showConfirm} onConfirm={()=>HandleConfirmFun() } cancel={()=>setshowconfirm(false) }></Confirm>
    </div>
  



    <div className="table" style={{width:'100%'}}>
        <table className="" style={{width:'100%'}}>
            <thead>
            <tr>
        <th>Order Number</th>
        <th>Ordered At</th>
        <th>Price</th>
        <th>Expected Delievery</th>
        <th>Products</th>
        
        
        
        <th>Status</th> 
        <th>Actions</th>
        
    </tr>
            </thead>
            <tbody>
            {orders?.length > 0 ?
            
            (
              orders
                .filter(order => order.isAccepted === true)
                .map((order, index) => ( 
                    <tr key={order?.orderId} className={` ${order.isDeleted === true ? 'block-box' : ''}`}>
                        
                        <td>{index + 1}</td> 
                        <td>{new Date(order?.createdAt).toLocaleDateString()}</td>
                        <td>
                            <span className="price-wrapper2">
                                {order?.totalOrderPrice || '0.0'}
                                <i className="fi fi-tc-dollar"></i>
                            </span>
                        </td>
                        <td>{new Date(order?.expectedDelievery).toLocaleDateString()}</td>
                        
                        {/* Products Column (5) */}
                        <td className="catname">
                            {order?.orderProducts?.map((p) => (
                                <p key={p?.productId}>
                                    {p?.productName} : {p.quantity}
                                </p>
                            ))}
                        </td>
                        
                        {/* Status Column (6) - FIXED JSX */}
                        <td>
                            <span style={{ 
                                background: order.isDelievered 
                                    ? 'green' 
                                    : 'red' ,
                                        
                                padding: '5px', 
                                borderRadius: '4px', 
                                color: 'white' 
                            }}> 
                                {order.isDelievered 
                                    ? 'Delivered' 
                                    : 'Not Delivered'}
                            </span>
                            {/* Add another status check, e.g., if (order.isDelievered) */}
                        </td>

                        {/* Actions Column (7) */}
                       
                        <td className={`icons `}>
                           
                            <span style={{ cursor: 'pointer', marginLeft: '10px',whiteSpace:'nowrap' }} >
                                <i className="fi fi-rr-check-circle" onClick={()=>HandleConfirmDelievery(order)} >Send to Delivery</i>
                            </span>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={7} style={{ textAlign: 'center' }}>No orders found.</td> {/* 🎯 FIX: Updated colSpan to 7 */}
                </tr>
            )}
            </tbody>
        </table>
        
       
        <Confirm show={showConfirmdeleivery} onConfirm={()=>HandleConfirmDelieveryFun() } cancel={()=>setshowconfirmdelivery(false)} message={"Are You Sure Of Delievery?"}></Confirm>
    </div>
</>
    
    );
}

