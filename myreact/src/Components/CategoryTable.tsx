import { useState } from "react";
import { Category, SaveCategoryRequest } from "../interfaces/CategoryInterface";
import { Product } from "../interfaces/ProductInterface";
import { FaS } from "react-icons/fa6";
import CategoryForm from "./CategoryForm";
import { DeleteCategory, fetchCategories, SaveCategory } from "../data/CategoryServices";
import ConfirmDelete from "./ConfirmDelete";

export default function CategoryTable({categories}:{categories:Category[]}){
    const[selectedCategory,setSelectedCategory]=useState<Category>();
    const[showform,setshowform]=useState<boolean>(false);
    const[showDelete,setshowDelete]=useState<boolean>(false);
    const[categories2,setcategories]=useState<Category[]>([]);
    const HandleEdit=(category?:Category)=>{
       setSelectedCategory(category);
       setshowform(true);
    };
    const RefreshData=async ()=>{
       const data=await fetchCategories();
      setcategories(data);
       
    };
  


      const HandleDelete = (category:Category) => {
       
        setSelectedCategory(category);
        setshowDelete(true);
      };
    
      const ConfirmDeleteFun = async () => {
      
        if (!selectedCategory) return;
        try {
          const response = await DeleteCategory(selectedCategory);
          if (response?.success === "true") {
            alert(response.message);
            setshowDelete(false); // Ensure this is called after the alert
          await RefreshData();
          } else {
            alert(response?.message || "Failed to delete product.");
          }
        } catch (error) {
          alert("Error: " + error);
        } finally {
          setshowDelete(false); // Ensure this is always called, even if an error occurs
        }
      };
  

     const handleCreateOrUpdate = async (data: SaveCategoryRequest) => {
       
        
    
       
        try {
          const res = await SaveCategory(data);
          const result = res as { message: string }; // Type assertion
          alert("✅ Product saved: " + result.message);
          setshowform(false);
          RefreshData();
        } catch (err: unknown) {
          if (err instanceof Error) {
            alert("❌ Error: " + err.message);
          } else {
            alert("❌ An unknown error occurred."+err);
            console.log(err);
          }
        }
      };
    

  return(
    <div className="table" style={{width:'100%'}}>
    <table style={{width:'100%'}}>
      <thead>
        <tr>
          <th>Number</th>
          <th>Category  Name</th>
        
          <th>Category Color </th>
          <th>Created At</th>
          <th>Actions</th>
          <span className="icon" onClick={()=>{setSelectedCategory(undefined) ;setshowform(true)}}><i className="fi fi-tr-add"></i></span>
        </tr>
        
      </thead>
      <tbody>
      {categories?.map((category)=>(
        
        <>
          
         <tr key={category.categoryId}>
         <td className="image3">
                <img 
                  src={`data:image/jpeg;base64,${category.categoryImage || ""}`} 
                  alt="Product Image" 
                  
                />
                </td>
          <td>{category.categoryName}</td>
          
          <td  className="catname">
            <span style={{background:category.categoryColor}}>

            {category.categoryColor}
            </span>
          </td>
       
        
         
         
          <td>{category.createdAt}</td>
          
          <td className="icons">
         <span>
         <i className="fi fi-tc-pencil" onClick={()=>HandleEdit(category)}></i>
         </span>
         <span>
         <i className="fi fi-rr-cross" onClick={()=>HandleDelete(category)}></i>
         </span>
          
         
          </td>
         </tr>
        
        </>
       
         
     ))}
      </tbody>
     
    </table>
     <CategoryForm visible={showform} category={selectedCategory} onSubmit={handleCreateOrUpdate} onCancel={()=>setshowform(false)}></CategoryForm>
     <ConfirmDelete show={showDelete} onConfirm={ConfirmDeleteFun} cancel={()=>setshowDelete(false) } ></ConfirmDelete>
  </div>
  );
};