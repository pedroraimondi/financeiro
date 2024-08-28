import { dateNowInString } from '@/utils/date';
import { priceFormatter, toFloat } from '@/utils/formatter';
import axios from 'axios';
import { Pencil, Trash } from 'phosphor-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import TransactionFormModal from '../TransactionForm';
import styles from './Transactions.module.css';
import Input from '@/elements/Input';

export default function Transactions({ transactions, account, setAccount, fetchTransactions }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tecValue, setTecValue] = useState('');
  const [fields, setFields] = useState({
    description: { value: '' },
    quantity: { value: '' },
    price: { value: '' },
    date: { value: dateNowInString() },
    category: { value: '' },
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

  const handleDelete = (transaction) => {
    const deleteTransaction = () => {
      axios.delete('/api/transaction/', { params: { _id: transaction._id } }).then(() => {
        fetchTransactions();
      })
    }
    toast((t) => (
      <div className={styles.toastConfirm}>
        <p>Tem certeza que deseja deletar a transação <b>{transaction.description}</b>?</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ backgroundColor: account.color }} onClick={() => { deleteTransaction(); toast.dismiss(t.id) }}>
            Sim
          </button>
          <button style={{ backgroundColor: "#AB222E" }} onClick={() => toast.dismiss(t.id)}>
            Não
          </button>
        </div>
      </div>
    ),
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );

  }

  const handleEdit = (transaction) => {
    setIsOpen(true);

    setFields({
      transactionId: transaction._id,
      description: { value: transaction.description },
      price: { value: `R$ ${transaction.value}`.replace('.', ',') },
      quantity: { value: transaction.quantity || 1 },
      category: {
        value: {
          label: transaction.category.label,
          instanceId: transaction.category._id,
          value: transaction.category._id
        }
      },
      date: { value: transaction.createdAt.split('T')[0] },
      transactionType: { value: transaction.type },
      paymentDestination: transaction.destination
        ? {
          value: {
            label: transaction.destination,
            value: transaction.destination
          }
        }
        : '',
      paymentDestinationData: {
        value: transaction.recipients?.length
          ? transaction.recipients.map(({ name, quantity }) => ({
            name: { value: { label: name, instanceId: name, value: name } },
            quantity: { value: `R$ ${quantity}`.replace('.', ',') }
          }))
          : [{
            quantity: { value: '' },
            name: { value: '' },
          }]
      },
    })
  }

  const handleSubmit = async (transactionId) => {

    const data = {
      _id: transactionId,
      description: fields.description.value,
      quantity: fields.quantity.value,
      value: toFloat(fields.price.value),
      category: fields.category?.value?.label,
      createdAt: new Date(fields?.date?.value),
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

    await axios.put('/api/transaction', data);
    fetchTransactions()
    setIsOpen(false);
  }

  const handleSetFilter = (filter) => {
    if (filter.filter) { 
      setTecValue('') 
      fetchTransactions();
    }
    setAccount({ ...account, filter: JSON.stringify(filter) });;
    toast.promise(
      fetchTransactions(filter),
      {
        loading: 'Salvando filtro e atualizando listagem',
        success: 'Filtro salvo e lista atualizada',
        error: 'Erro ao salvar e filtrar lista'
      },
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );
  }

  const dateFormatter = (date) => date.split('T')[0].replaceAll('-', '/')

  const inputProps = {
    field: {
      value: tecValue,
      name: 'tec',
      type: 'select',
      isCreatable: true,
      isClearable: true,
      isSearchable: true,
      placeholder: 'Técnico',
      onChange: ({ target: { value } }) => {
        setTecValue(value);
        if (value?.label) handleSetFilter({ recipients: value?.label })
      },
      loadOptions: (query, callback) => axios.get('/api/category')
        .then((res) => {
          callback(res.data
            ?.filter((option) => option.label.toLowerCase()?.normalize("NFD").includes(query.toLowerCase()?.normalize("NFD")))
            ?.map((option) => ({ instanceId: option._id, label: option.label, value: option._id }))
          )
        })
    }
  }

  return (
    <div className={styles.transactionsContainer}>
      <div className={styles.filters}>
        Técnico: <Input {...inputProps} />
        <button onClick={() => handleSetFilter({ filter: 'weakly' })} className={account.filter == 'weakly' && styles.filterActive}>Semanal</button>
        <button onClick={() => handleSetFilter({ filter: 'monthly' })} className={account.filter == 'monthly' && styles.filterActive}>Mensal</button>
        <button onClick={() => handleSetFilter({ filter: 'yearly' })} className={account.filter == 'yearly' && styles.filterActive}>Anual</button>
        <button onClick={() => handleSetFilter({ filter: 'date' })} className={account.filter == 'date' && styles.filterActive}>Data</button>
      </div>
      <tbody className={styles.table}>
        {!transactions?.length
          ? <h1>Sem transações inseridas</h1>
          : transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td className={styles.transactionsCardTitle}>{transaction.description}</td>
              <td className={styles.transactionsCardQuantity}>{(transaction.quantity || 1) + 'x'}</td>
              <td className={styles.transactionsCardPrice}>
                <span style={{ color: account.color }} className={styles[transaction.type]}>
                  {priceFormatter(transaction.type === 'outcome' ? -transaction.value : transaction.value)}
                </span>
              </td>
              <td className={styles.transactionsCardCategory}>{transaction.category.label}</td>
              <td className={styles.transactionsCardCreatedAt}>
                {dateFormatter(transaction.createdAt)}
              </td>
              <td className={styles.options}>
                <div className={styles.optionsButton} onClick={() => handleEdit(transaction)}>
                  <Pencil width={23} height={23} color={account.color} />
                </div>
                <div className={styles.optionsButton} onClick={() => handleDelete(transaction)}>
                  <Trash width={23} height={23} color="#AB222E" />
                </div>
              </td>
            </tr>
          ))}
      </tbody>

      <TransactionFormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleOpen={toggleOpen}
        fields={fields}
        setFields={setFields}
        fetchTransactions={fetchTransactions}
        account={account}
        handleSubmit={handleSubmit}
      />

    </div>
  )
}
