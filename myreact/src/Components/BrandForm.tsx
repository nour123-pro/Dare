import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import { Brand } from "../interfaces/BrandInterface";
import styles from "../assets/FormPop.module.css";

interface BrandFormProps {
    visible: boolean;
    brand?: Brand;
    onSubmit: (brand: Brand) => void;
    onCancel: () => void;
}

export default function BrandForm({
    visible,
    brand,
    onSubmit,
    onCancel,
}: BrandFormProps) {
    const [form] = Form.useForm();
      const[base64Images,setBase64Images]=useState<string[]>([]);
    useEffect(() => {
        if (brand) {
            form.setFieldsValue({
                ...brand,
            });
        } else {
            form.resetFields();
        }
    }, [brand, form]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const finalBrand: Brand = {
                    ...(brand || {
                        brandImage: base64Images, // Use base64 images from state here
                    }),
                    ...values,
                    brandImage: base64Images, // Use base64 images from state here
                };
                onSubmit(finalBrand);
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
            title={<div className={styles.modalHeader}>{brand ? "Edit Brand" : "Create Brand"}</div>}
            onCancel={() => { onCancel(); form.resetFields(); }}
            className={styles.modalContent}
            footer={null}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="brandName"
                    label="Brand Name"
                    rules={[{ required: true, message: "Please enter the brand name" }]}
                    className={styles.formItem}
                >
                    <Input className={styles.input} />
                </Form.Item>

                <Form.Item
                    name="brandDescription"
                    label="Description"
                    rules={[{ required: true, message: "Please enter the brand description" }]}
                    className={styles.formItem}
                >
                    <Input.TextArea rows={3} className={styles.input} />
                </Form.Item>

                <Form.Item label="Brand Images" className={styles.formItem}>
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
<Form.Item name="brandImage" hidden>
  <Input type="hidden" />
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
