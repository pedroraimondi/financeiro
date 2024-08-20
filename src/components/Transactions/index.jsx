import { dateFormatter, priceFormatter } from '@/utils/formatter';
import styles from './Transactions.module.css';

export default function Transactions({ transactions }) {

  return (
    <div className={styles.transactionsContainer}>
      <tbody className={styles.table}>
        {!transactions?.length
          ? <h1>Sem transações inseridas</h1>
          : transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className={styles.transactionsCardTitle} width="50%">{transaction.description}</td>
              <td className={styles.transactionsCardPrice}>
                <span className={styles[transaction.type]}>
                  {priceFormatter(transaction.type === 'outcome' ? -transaction.value : transaction.value)}
                </span>
              </td>
              <td className={styles.transactionsCardCategory}>{transaction.category.label}</td>
              <td className={styles.transactionsCardCreatedAt}>
                {dateFormatter.format(new Date(transaction.createdAt))}
              </td>
            </tr>
          ))}
      </tbody>
    </div>
  )
}
