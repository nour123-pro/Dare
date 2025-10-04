import { useEffect, useState } from "react";
import { Product, ProductCreateRequest } from "../interfaces/ProductInterface";
import { createProduct, DeleteProduct, fetchProducts } from "../data/ProductServices";
import FormPop from "./FormPop";
import { Category } from "../interfaces/CategoryInterface";
import { Brand, BrandCreate } from "../interfaces/BrandInterface";
import ConfirmDelete from "./ConfirmDelete";
import { FaS } from "react-icons/fa6";
import { FetchBrands, SendBrandRequest, SendBrandRequestDeletion } from "../data/BrandServices";
import BrandForm from "./BrandForm";

export default function BrandTable() {
  const[brands,setbrands]=useState<Brand[]>([])
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedBrand, setSelectedbrand] = useState<Brand>();
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const GetBrands = async () => {
    const data = await FetchBrands();
    if (data) setbrands(data);
    else console.log("Error fetching products");
  };

  useEffect(() => {
    GetBrands();
  }, []);

  const HandleEdit = (brand:Brand) => {
    setSelectedbrand(brand);
    setShowForm(true);
  };

  const HandleDelete = (brand:Brand) => {
   
    setSelectedbrand(brand);
    setShowDelete(true);
  };

  const ConfirmDeleteFun = async () => {
    
    if (!selectedBrand) return;
    try {
      const response = await SendBrandRequestDeletion(selectedBrand.brandId);
      if (response?.success === "true") {
        alert(response.message);
        setShowDelete(false); // Ensure this is called after the alert
       GetBrands();
      } else {
        alert(response?.message || "Failed to delete product.");
      }
    } catch (error) {
      alert("Error: " + error);
    } finally {
      setShowDelete(false); // Ensure this is always called, even if an error occurs
    }
  };

  
  const handleCreateOrUpdate = async (brand:Brand) => {
    const convertImagesToBase64 = async (images: File[]): Promise<string[]> => {
      const promises = images.map((image) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(image);
        });
      });
      const base64Images = await Promise.all(promises);
      return base64Images.map((base64) => base64.split(",")[1]); // Remove the data:image/...;base64, prefix
    };

    const payload: BrandCreate = {
      BrandName:brand.brandName,
      BrandDescription:brand.brandDescription,
      BrandImage: brand.brandImage ? brand.brandImage : [],
      
    };

    if (brand.brandId) {
      payload.BrandId = brand.brandId;
    }
     console.log(payload);
    try {
      const res = await SendBrandRequest(payload);
      const result = res as { message: string }; // Type assertion
      alert("✅ Product saved: " + result.message);
      setShowForm(false);
      GetBrands();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("❌ Error: " + err.message);
      } else {
        alert("❌ An unknown error occurred."+err);
        console.log(err);
      }
    }
  };

  
  return (
    <div className="table" style={{width:'100%'}}>
    <table style={{width:'100%'}}>
      <thead>
        <tr>
        <th>Image</th>
          <th>Name</th>
        
          <th>Description</th>
          
          <th>Status</th>
          <th>Created At</th>
          <th>Actions</th>
          <span className="icon" onClick={() => { setSelectedbrand(undefined); setShowForm(true); }}><i className="fi fi-tr-add"></i></span>
        </tr>
        
      </thead>
      <tbody>
      {brands?.filter(brand => brand.isDeleted !== true).map(brand => (
        
        <>
          
         <tr key={brand.brandId}>
         
          <td>{brand.brandName}</td>
          
          <td  className="catname">
            <span >

            {brand.brandDescription}
            </span>
          </td>
       
         <td className="image3">
          {brand.brandImage?(
            <img 
            src={`data:image/jpeg;base64,${brand.brandImage || ""}`} 
            alt="Product Image" 
            
          />
          ):(
            <span className="icon" >

            </span>
          )}
          
         </td>
         <td>{brand.isDeleted}</td>
         
          <td>{brand.createdAt}</td>
          
          <td className="icons">
         <span>
         <i className="fi fi-tc-pencil" onClick={()=>HandleEdit(brand)}></i>
         </span>
         <span>
         <i className="fi fi-rr-cross" onClick={()=>HandleDelete(brand)}></i>
         </span>
          
         
          </td>
         </tr>
        
        </>
       
         
     ))}
      </tbody>
     
    </table>
    <ConfirmDelete show={showDelete} onConfirm={()=>ConfirmDeleteFun()} cancel={()=>setShowDelete(false)}></ConfirmDelete>
     <BrandForm visible={showForm} onSubmit={handleCreateOrUpdate} onCancel={()=>setShowForm(false)} brand={selectedBrand} ></BrandForm>
  </div>
  );
}
