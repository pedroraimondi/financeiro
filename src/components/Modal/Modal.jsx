import styles from './Modal.module.css';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

export default function Modal({ isOpen, toggleOpen, children }) {
  if (isOpen) {
    return (
      <div className={styles.modalBackground} onClick={() => toggleOpen(false)}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>

          <div className={styles.closeButton} onClick={() => toggleOpen(false)}>
            <X size={24} />
          </div>

          {children}
        </div>
      </div>
    )
  } else {
    return <></>;
  }
}
