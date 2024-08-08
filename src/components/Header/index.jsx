import Image from 'next/image';
import styles from './Header.module.css'
import Button from '@/elements/Button';
import Logo from '../../../public/logo';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import Input from '@/elements/Input';

export default function Header({ account, handleAccounts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({});
  const variation = account.id === 0 ? 'primary' : 'secondary';

  const transactionFields = {}

  const toggleOpen = (status) => {
    if(status != undefined) {
      setIsOpen(status)
    } else {
      setIsOpen(!isOpen);
    }
  }
  
  return (
    <div className={`${styles.headerContainer} ${styles[variation]}`}>
      <div className={styles.headerContent}>

        {Logo(account.color)}

        <div className={styles.accounts}>
          <Button variation={account.id == 0 && 'primary'} onClick={() => handleAccounts(0)}>Conta 1</Button>
          <Button variation={account.id == 1 && 'secondary'} onClick={() => handleAccounts(1)}>Conta 2</Button>
        </div>

        <Button variation={variation} onClick={toggleOpen}>Nova transação</Button>

      </div>

      <Modal isOpen={isOpen} toggleOpen={toggleOpen}>
        <h2>Nova Transação</h2>
        <Input fields={transactionFields} setFields={setFields} />
      </Modal>
    </div>
  )
}
