import Image from 'next/image';
import styles from './Header.module.css'
import Button from '@/elements/Button';
import Logo from '../../../public/logo';

export default function Header({ account, handleAccounts }) {
  const variation = account.id === 0 ? 'primary' : 'secondary';

  return (
    <div className={`${styles.headerContainer} ${styles[variation]}`}>
      <div className={styles.headerContent}>

        {Logo(account.color)}

        <div className={styles.arrows}>
          <Button variation={account.id == 0 && 'primary'} onClick={() => handleAccounts(0)}>Conta 1</Button>
          <Button variation={account.id == 1 && 'secondary'} onClick={() => handleAccounts(1)}>Conta 2</Button>
        </div>

        <Button variation={variation} onClick={() => { }}>Nova transação</Button>

      </div>
    </div>
  )
}
