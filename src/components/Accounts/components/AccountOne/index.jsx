import Transactions from '@/components/Transactions';
import styles from './AccountOne.module.css';

export default function AccountOne({ account }) {
  return (
    <div className={styles.accountOne}>
      <Transactions account={account} />
    </div>
  )
}
