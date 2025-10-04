import { useEffect, useState } from "react";
import { Product, ProductCreateRequest } from "../interfaces/ProductInterface";
import { createProduct, DeleteProduct, fetchProducts } from "../data/ProductServices";
import FormPop from "./FormPop";
import { Category } from "../interfaces/CategoryInterface";
import { Brand } from "../interfaces/BrandInterface";
import ConfirmDelete from "./ConfirmDelete";
import { FaS } from "react-icons/fa6"; // Note: FaS was imported but not used

export default function ProductTable({ categories, brands }: { categories: Category[], brands: Brand[] }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const GetProducts = async () => {
    const data = await fetchProducts();
    if (data) setProducts(data);
    else console.log("Error fetching products");
  };

  useEffect(() => {
    GetProducts();
  }, []);

  const HandleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const HandleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowDelete(true);
  };

  const ConfirmDeleteFun = async () => {
    if (!selectedProduct) return;
    try {
      const response = await DeleteProduct(selectedProduct.productId);
      if (response?.success === "true") {
        alert(response.message);
        setShowDelete(false); // Ensure this is called after the alert
        GetProducts(); // Refresh list
      } else {
        alert(response?.message || "Failed to delete product.");
      }
    } catch (error) {
      alert("Error: " + error);
    } finally {
      setShowDelete(false); // Ensure this is always called, even if an error occurs
    }
  };

  const handleCreateOrUpdate = async (product: Product) => {
    // NOTE: convertImagesToBase64 function was defined in your previous prompt but not used here.
    // The implementation below assumes the 'product' object is ready for the API payload.

    const payload: ProductCreateRequest = {
      productname: product.productName,
      brandid: product.brand.brandId,
      categoryid: product.category.categoryId,
      productdescription: product.productDescription,
      productprice: product.productPrice,
      ProductImages: product.productImages ?? [],
      productingredients: product.productIngredients ?? [],
    };

    if (product.productId) {
      payload.productid = product.productId;
    }
     console.log(payload);
    try {
      const res = await createProduct(payload);
      const result = res as { message: string }; // Type assertion
      alert("✅ Product saved: " + result.message);
      setShowForm(false);
      GetProducts();
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
      <table className="" style={{width:'100%'}}>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
            <span className="icon" onClick={() => { setSelectedProduct(undefined); setShowForm(true); }}>
            <i className="fi fi-tr-add"></i>
          </span>
          </tr>
          
        </thead>
        <tbody>
            {products.filter(product => !product.isDeleted).map((product) => (
            <tr key={product.productId}>
                <td className="image3">
                <img 
                  src={`data:image/jpeg;base64,${product.productImages?.[0] || ""}`} 
                  alt="Product Image" 
                  
                />
                </td>
              <td>{product.productName}</td>
              <td>{product.brand.brandName}</td>
              <td><span className="price-wrapper2">{product.productPrice || '0.0'}<i className="fi fi-tc-dollar"></i></span></td>
              <td>{product.productDescription}</td>
              <td className="catname"><span style={{ background: product.category.categoryColor }}  >{product.category.categoryName}</span></td>
              <td className="icons">
                <span>
                <i className="fi fi-tc-pencil" onClick={() => HandleEdit(product)}></i>
                </span>
                <span>
                <i className="fi fi-rr-cross" onClick={() => HandleDelete(product)}></i>
                </span>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <FormPop
        visible={showForm}
        brands={brands}
        categories={categories}
        product={selectedProduct}
        onSubmit={handleCreateOrUpdate}
        onCancel={() => setShowForm(false)}
      />

      <ConfirmDelete
        show={showDelete}
        onConfirm={ConfirmDeleteFun}
        cancel={() => setShowDelete(false)}
      />
    </div>
  );
}