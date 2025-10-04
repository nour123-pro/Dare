import { useEffect } from "react";
import { Modal, Form, Input, InputNumber } from "antd";

import styles from "../assets/FormPop.module.css";
import { Product } from "../interfaces/ProductInterface";
import { Account } from "../interfaces/AccountInterface";

const { TextArea } = Input;
export interface Review {
  reviewId: string; 
  accountId: string;
  account:Account;
  reviewContent: string;
  createdAt: string; 
  isDeleted: boolean;
  productId: string;
  product: Product;
  ratingNumber:number;
}
interface ReviewPopFormProps {
    visible: boolean;
    review?: Review;
    onSubmit: (review: Review) => void;
    onCancel: () => void;
}

export default function ReviewPopForm({
    visible,
    review,
    onSubmit,
    onCancel,
}: ReviewPopFormProps) {
    const [form] = Form.useForm<Review>();

    useEffect(() => {
        if (review) {
            form.setFieldsValue({
                ...review,
            });
        } else {
            form.resetFields();
        }
    }, [review, form]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const finalReview: Review = {
                    ...review,
                    ...values,
                };
                onSubmit(finalReview);
                form.resetFields();
            })
            .catch((info) => {
                console.log("Validation Failed:", info);
            });
    };

    return (
        <Modal
            open={visible}
            title={
                <div className={styles.modalHeader}>
                    {review ? "Edit Review" : "Create Review"}
                </div>
            }
            onCancel={() => {
                onCancel();
                form.resetFields();
            }}
            className={styles.modalContent}
            footer={null}
        >
            <Form form={form} layout="vertical">
               

               

                <Form.Item
                    name="reviewContent"
                    label="Review Content"
                    rules={[{ required: true }]}
                    className={styles.formItem}
                >
                    <TextArea rows={3} className={styles.input} />
                </Form.Item>

                <Form.Item
                    name="ratingNumber"
                    label="Rating"
                    rules={[{ required: true, type: "number", min: 0, max: 5 }]}
                    className={styles.formItem}
                >
                    <InputNumber
                        min={0}
                        max={5}
                        style={{ width: "100%" }}
                        className={styles.input}
                    />
                </Form.Item>
            </Form>

            <div className={styles.buttonGroup}>
                <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={onCancel}
                >
                    <span className={styles.buttonContent}>
                        <i className="fi fi-br-delete"></i> Cancel
                    </span>
                </button>
                <button
                    type="button"
                    className={styles.saveButton}
                    onClick={handleOk}
                >
                    <span className={styles.buttonContent}>
                        <i className="fi fi-tr-check-double"></i> Save
                    </span>
                </button>
            </div>
        </Modal>
    );
}
