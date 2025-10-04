import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, InputNumber } from "antd";
import { Brand } from "../interfaces/BrandInterface";
import { Category } from "../interfaces/CategoryInterface";
import { Product } from "../interfaces/ProductInterface";
import styles from "../assets/FormPop.module.css";

const { TextArea } = Input;
const { Option } = Select;

interface FormPopProps {
  visible: boolean;
  product?: Product;
  brands: Brand[];
  categories: Category[];
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

export default function FormPop({
  visible,
  product,
  brands,
  categories,
  onSubmit,
  onCancel,
}: FormPopProps) {
  const [form] = Form.useForm();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const[base64Images,setBase64Images]=useState<string[]>([]);
  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        productId:product.productId,
        brandId: product.brand.brandId,
        categoryId: product.category.categoryId,
        ProductPrice: parseFloat(product.productPrice),
      });
      if (product.productImages && product.productImages.length > 0) {
        setBase64Images(product.productImages as string[]);
      } else {
        setBase64Images([]);
      }
    } else {
      form.resetFields();
      setBase64Images([]);
    }
  }, [product, form]);
  
  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        const finalProduct: Product = {
          ...(product || {
           // productId: crypto.randomUUID(),
            isDeleted: false,
            rating: 0,
            productIngredients: [],
            brand: brands.find(b => b.brandId === values.brandId)!,
            category: categories.find(c => c.categoryId === values.categoryId)!,
            productImages: base64Images
          }),
          ...values,
          productImages: base64Images, // Use base64 images from state here
          productPrice: values.ProductPrice.toString(),
          productIngredients: product?.productIngredients || [],
        };
        onSubmit(finalProduct);
        console.log(product);
        form.resetFields();
        setBase64Images([]);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };
  

  return (
    <Modal
      open={visible}
      title={<div className={styles.modalHeader}>{product ? "Edit Product" : "Create Product"}</div>}
      onCancel={() => { onCancel(); form.resetFields(); }}
      className={styles.modalContent}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="productName" label="Product Name" rules={[{ required: true }]} className={styles.formItem}>
          <Input className={styles.input} />
        </Form.Item>

        <Form.Item label="Product Images" className={styles.formItem}>
        <input
  type="file"
  multiple
  onChange={async (e) => {
    try {
      const files = Array.from(e.target.files || []);
      const base64Strings = await Promise.all(
        files.map(file => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        }))
      );
      console.log("Base64 images", base64Strings);
      setBase64Images(base64Strings);
    } catch (err) {
      console.error("File upload error:", err);
    }
  }}
  className={styles.input}
/>

</Form.Item>

{/* Hidden field to bind the base64 array */}
<Form.Item name="ProductImages" hidden>
  <Input type="hidden" />
</Form.Item>



        <Form.Item name="productDescription" label="Description" rules={[{ required: true }]} className={styles.formItem}>
          <TextArea rows={3} className={styles.input} />
        </Form.Item>

        <Form.Item name="ProductPrice" label="Price" rules={[{ required: true }]} className={styles.formItem}>
          <InputNumber min={0} prefix="$" style={{ width: "100%" }} className={styles.input} />
        </Form.Item>

        <Form.Item name="brandId" label="Brand" rules={[{ required: true }]} className={styles.formItem}>
          <Select placeholder="Select Brand" className={styles.input}>
            {brands?.map((brand) => <Option key={brand.brandId} value={brand.brandId}>{brand.brandName}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item name="categoryId" label="Category" rules={[{ required: true }]} className={styles.formItem}>
          <Select placeholder="Select Category" className={styles.input}>
            {categories?.map((category) => <Option key={category.categoryId} value={category.categoryId}>{category.categoryName}</Option>)}
          </Select>
        </Form.Item>
      </Form>

      <div className={styles.buttonGroup}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          <span className={styles.buttonContent}><i className="fi fi-br-delete"></i> Cancel</span>
        </button>
        <button type="button" className={styles.saveButton} onClick={handleOk}>
          <span className={styles.buttonContent}><i className="fi fi-tr-check-double"></i> Save</span>
        </button>
      </div>
    </Modal>
  );
}
