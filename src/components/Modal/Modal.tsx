import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export function Modal(props: Readonly<ModalProps>) {
  if (props.isOpen) {
    return (
      <div className={styles.background}>
        <div className={styles.modal_body}>{props.children}</div>
      </div>
    );
  }

  return null;
}
