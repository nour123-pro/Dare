import { Modal } from "antd";
import styles from "../assets/ConfirmDelete.module.css";
interface ConfirmDeleteProps {
  show: boolean;
  onConfirm: () => void;
  cancel: () => void;
}

export default function ConfirmDelete({
  show,
  onConfirm,
  cancel,
}: ConfirmDeleteProps) {
  return (
    <Modal
      open={show}
      onCancel={cancel}
      footer={null}
      closable={false}
      centered
      className={styles.modal}
    >
      <div className={styles.container}>
      <div className={styles.iconWrapper}>
      <i className="fi fi-rs-shield-security-risk" style={{color:'red'}}></i>
        </div>
        <p className={styles.message}>Are you sure you want to delete this item?</p>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={cancel}>
            <i className="fi fi-br-cross-small"></i> Cancel
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            <i className="fi fi-br-trash"></i> Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
