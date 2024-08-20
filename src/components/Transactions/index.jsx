import { dateFormatter, priceFormatter } from '@/utils/formatter';
import styles from './Transactions.module.css';
import { Pencil, Trash } from 'phosphor-react';
import axios from 'axios';

export default function Transactions({ transactions, account, fetchTransactions }) {

  const handleDelete = (transactionId) => {
    axios.delete('/api/transaction/', { params: { _id: transactionId } }).then(() => {
      fetchTransactions()
    })
  }

  return (
    <div className={styles.transactionsContainer}>
      <tbody className={styles.table}>
        {!transactions?.length
          ? <h1>Sem transações inseridas</h1>
          : transactions.map((transaction) => (
            <tr key={transaction._id}>
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
              <td className={styles.options}>
                <div className={styles.optionsButton}>
                  <Pencil width={23} height={23} color={account.color} />
                </div>
                <div className={styles.optionsButton} onClick={() => handleDelete(transaction._id)}>
                  <Trash width={23} height={23} color="#AB222E" />
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </div>
  )
}
