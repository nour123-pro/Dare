import { Form, Input, Modal } from "antd";
import { Category, SaveCategoryRequest } from "../interfaces/CategoryInterface";
import styles from "../assets/FormPop.module.css";
import { useEffect, useState } from "react";

interface CategoryProps {
  visible: boolean;
  category?: Category;
  onSubmit: (category: SaveCategoryRequest) => void;
  onCancel: () => void;
}

export default function CategoryForm({ visible, category, onSubmit, onCancel }: CategoryProps) {
  const [form] = Form.useForm();
  const [base64Images, setBase64Images] = useState<string[]>([]);

  useEffect(() => {
    // Populate form fields when category changes
    if (category) {
      form.setFieldsValue({
        categoryname: category.categoryName,
        categorycolor:category.categoryColor,
        categoryimages:category.categoryImage
      });

      // If you have existing images from category, you might want to set base64Images here too
      // setBase64Images(category.categoryimages || []);
    } else {
      form.resetFields();
      setBase64Images([]);
    }
  }, [category, form]);

  function handleOk() {
    form.validateFields().then((values) => {
      // Build SaveCategoryRequest object
      const dataToSend: SaveCategoryRequest = {
        categoryid: category?.categoryId,
        categoryname: values.categoryname,
        categoryimages: base64Images,
        categorycolor: values.categorycolor || "", // optional
      };

      onSubmit(dataToSend);
    }).catch((err) => {
      console.log("Validation failed:", err);
    });
  }

  return (
    <Modal
      open={visible}
      title={<div className={styles.modalHeader}>{category ? "Edit Category" : "Create Category"}</div>}
      onCancel={() => {
        onCancel();
        form.resetFields();
        setBase64Images([]);
      }}
      footer={null}
      className={styles.modalContent}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="categoryname"
          label="Category Name"
          rules={[{ required: true, message: "Please enter the category name!" }]}
          className={styles.formItem}
        >
          <Input className={styles.input} />
        </Form.Item>

       
<Form.Item name="categorycolor" label="Category Color" className={styles.formItem}>
    <Input
        type="color"
        className={styles.input}
        style={{ width: "100%", height: "40px", padding: "0" }}
    />
</Form.Item>

        <Form.Item label="Category Images" className={styles.formItem}>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={async (e) => {
              try {
                const files = Array.from(e.target.files || []);
                const base64Strings = await Promise.all(
                  files.map(
                    (file) =>
                      new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve((reader.result as string).split(",")[1]);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                      })
                  )
                );
                setBase64Images(base64Strings);
              } catch (err) {
                console.error("File upload error:", err);
              }
            }}
            className={styles.input}
          />
        </Form.Item>
      </Form>

      <div className={styles.buttonGroup}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          <span className={styles.buttonContent}>
            <i className="fi fi-br-delete"></i> Cancel
          </span>
        </button>
        <button type="button" className={styles.saveButton} onClick={handleOk}>
          <span className={styles.buttonContent}>
            <i className="fi fi-tr-check-double"></i> Save
          </span>
        </button>
      </div>
    </Modal>
  );
}
