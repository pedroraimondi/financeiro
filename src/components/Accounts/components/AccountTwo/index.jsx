import Transactions from '@/components/Transactions';
import styles from './AccountTwo.module.css';

export default function AccountTwo({ account }) {
  return (
    <div className={styles.accountTwo}>
      <Transactions account={account} />
    </div>
  )
}
