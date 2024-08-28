'use client';

import Button from '@/elements/Button';
import { useState } from 'react';
import Logo from '../../../public/logo';
import styles from './Header.module.css';
import TransactionFormModal from '../TransactionForm';
import { toFloat } from '@/utils/formatter';
import axios from 'axios';
import { dateNowInString } from '@/utils/date';

export default function Header({ account, accounts, handleAccounts, fetchTransactions }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({
    description: { value: '' },
    quantity: { value: '' },
    price: { value: '' },
    category: { value: '' },
    date: { value: dateNowInString() },
    transactionType: { value: 'income' },
    paymentDestination: { value: '' },
    paymentDestinationData: {
      value: [
        {
          quantity: { value: '' },
          name: { value: '' },
        },
      ]
    },
  });

  const toggleOpen = (status) => {
    setIsOpen(status != undefined ? status : !isOpen)
    setFields({
      description: { value: '' },
      price: { value: '' },
      quantity: { value: '' },
      category: { value: '' },
      date: { value: dateNowInString() },
      transactionType: { value: 'income' },
      paymentDestination: { value: '' },
      paymentDestinationData: {
        value: [
          {
            quantity: { value: '' },
            name: { value: '' },
          },
        ]
      },
    })
  }

  const handleSubmit = async () => {

    const data = {
      description: fields.description.value,
      quantity: fields.quantity.value,
      value: toFloat(fields.price.value),
      category: fields.category?.value?.label,
      createdAt: new Date(fields.date?.value),
      type: fields.transactionType.value,
      account: account._id,
    }

    if (data.type === 'outcome') {
      data.destination = fields.paymentDestination.value?.value;
      data.recipients = fields.paymentDestinationData.value.map((recipient) => ({
        quantity: toFloat(recipient.quantity.value),
        name: recipient.name.value?.label
      }))
    }

    await axios.post('/api/transaction', data);
    fetchTransactions();
    setIsOpen(false);
  }

  return (
    <div style={{ borderBottom: `2px solid ${account.color}` }} className={styles.headerContainer}>
      <div className={styles.headerContent}>

        <div>{Logo(account.color)}</div>

        <div className={styles.accounts}>
          {Object.values(accounts)?.map((acc) => (
            <Button color={acc.color} disabled={acc._id != account._id} onClick={() => handleAccounts(acc)}>{acc.name}</Button>
          ))}
        </div>

        <div className={styles.newTransactionButton}>
          <Button color={account.color} onClick={toggleOpen}>Nova transação</Button>
        </div>

      </div>

      <TransactionFormModal
        account={account}
        fields={fields}
        setFields={setFields}
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
