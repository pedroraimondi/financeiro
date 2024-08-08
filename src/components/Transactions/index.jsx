'use client'

import { dateFormatter, priceFormatter } from '@/utils/formatter';
import styles from './Transactions.module.css';

export default function Transactions() {
  const transactions = [
    {
      "id": 1,
      "description": "Desenvolvimento de site",
      "type": "income",
      "category": "Venda",
      "price": 14000,
      "createdAt": "2022-07-29T19:36:44.505Z"
    },
    {
      "id": 2,
      "description": "Hambúrguer",
      "type": "outcome",
      "category": "Alimentação",
      "price": 60,
      "createdAt": "2022-07-29T19:30:44.505Z"
    },
    {
      "id": 3,
      "description": "Ignite Rocketseat",
      "type": "outcome",
      "category": "Educação",
      "price": 1980,
      "createdAt": "2022-07-29T19:24:44.505Z"
    },
    {
      "description": "Desenvolvimento de app",
      "price": 10000,
      "category": "Venda",
      "type": "income",
      "createdAt": "2022-07-30T13:26:57.560Z",
      "id": 4
    },
    {
      "description": "Pastel",
      "price": 5,
      "category": "Alimentação",
      "type": "outcome",
      "createdAt": "2022-07-30T13:30:57.560Z",
      "id": 5
    },
    {
      "description": "Iogurte de Banana",
      "price": 4,
      "category": "Alimentação",
      "type": "outcome",
      "createdAt": "2022-07-30T13:38:57.560Z",
      "id": 6
    },
    {
      "description": "Teste",
      "price": 3,
      "category": "Abc",
      "type": "income",
      "createdAt": "2024-08-06T07:15:30.451Z",
      "id": 7
    },
    {
      "description": "Carroça",
      "price": 19,
      "category": "Carros",
      "type": "outcome",
      "createdAt": "2024-08-06T07:23:57.508Z",
      "id": 8
    }
  ]

  return (
    <div className={styles.transactionsContainer}>
      <tbody>
        {transactions.map((transaction) => {
          return (
            <tr key={transaction.id}>
              <td className={styles.transactionsCardTitle} width="50%">{transaction.description}</td>
              <td className={styles.transactionsCardPrice}>
                <span className={styles[transaction.type]}>
                  {transaction.type === 'outcome' && '- '}
                  {priceFormatter.format(transaction.price)}
                </span>
              </td>
              <td className={styles.transactionsCardCategory}>{transaction.category}</td>
              <td className={styles.transactionsCardCreatedAt}>
                {dateFormatter.format(new Date(transaction.createdAt))}
              </td>
            </tr>
          )
        })}
      </tbody>
    </div>
  )
}
