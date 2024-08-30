'use client'

import { X } from 'phosphor-react';
import styles from './Modal.module.css';
import { useEffect } from 'react';

export default function Modal({ isOpen, toggleOpen, children }) {

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        toggleOpen(false)
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => { window.removeEventListener('keydown', handleEsc); };
  }, []);

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
