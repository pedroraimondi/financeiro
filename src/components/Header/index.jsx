'use client';

import Button from '@/elements/Button';
import Input from '@/elements/Input';
import axios from 'axios';
import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react';
import { useState } from 'react';
import Logo from '../../../public/logo';
import Modal from '../Modal/Modal';
import styles from './Header.module.css';

export default function Header({ account, handleAccounts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({
    description: { value: '' },
    price: { value: '' },
    quantity: { value: '' },
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

  const variation = account.id === 0 ? 'primary' : 'secondary';

  const onChange = (e) => {
    const { target: { value, name } } = e;
    setFields((oldFields) => {
      const newFields = { ...oldFields };
      newFields[name].value = value;
      return newFields;
    })

    return e;
  }

  const isPaymentDestinationIncome = fields?.transactionType?.value != 'outcome';

  const transactionFields = (() => ({
    description: {
      ...fields.description,
      name: 'description',
      type: 'text',
      placeholder: 'Descrição',
      onChange
    },
    quantity: {
      ...fields.quantity,
      name: 'quantity',
      type: 'number',
      placeholder: 'Qtd',
      onChange
    },
    price: {
      ...fields.price,
      name: 'price',
      type: 'price',
      placeholder: 'Preço',
      onChange
    },
    category: {
      ...fields.category,
      name: 'category',
      type: 'select',
      isCreatable: true,
      isSearchable: true,
      placeholder: 'Categoria',
      onChange,
      loadOptions: (query, callback) => axios.get('/api/category')
        .then((res) => {
          callback(res.data
            ?.filter((option) => option.label.toLowerCase()?.normalize("NFD").includes(query.toLowerCase()?.normalize("NFD")))
            ?.map((option) => ({ instanceId: option._id, label: option.label, value: option._id }))
          )
        })
    },
    paymentDestination: {
      ...fields.paymentDestination,
      name: 'paymentDestination',
      type: 'select',
      placeholder: 'Destino',
      disabled: isPaymentDestinationIncome,
      options: [
        { label: 'Prestador', value: 'Prestador' },
        { label: 'Empresa', value: 'Empresa' },
      ],
      onChange
    },
    paymentDestinationData: {
      ...fields.paymentDestinationData,
      name: 'paymentDestinationData',
      type: 'subFields',
      disabled: isPaymentDestinationIncome,
      title: fields?.paymentDestination?.value?.label || 'Prestador/Empresa',
      subFieldFormStyle: styles.subFieldFormStyle,
      subFields: {
        quantity: {
          name: 'quantity',
          type: 'price',
          placeholder: 'Quantia',
          onChange: (value, i) => {
            setFields((oldFields) => {
              const newFields = { ...oldFields };
              newFields.paymentDestinationData.value[i].quantity.value = value;
              return newFields;
            })
          }
        },
        name: {
          name: 'name',
          type: 'text',
          placeholder: 'Nome',
          onChange: (value, i) => {
            setFields((oldFields) => {
              const newFields = { ...oldFields };
              newFields.paymentDestinationData.value[i].name.value = value;
              return newFields;
            })
          }
        }
      },
      onAddField: () => {
        setFields((oldFields) => {
          const newFields = { ...oldFields };
          newFields.paymentDestinationData.value = [...newFields.paymentDestinationData.value, {
            quantity: { value: '' },
            name: { value: '' },
          }]
          return newFields;
        })
      },
      onRemoveField: (i) => {
        setFields((oldFields) => {
          const newFields = { ...oldFields };
          newFields.paymentDestinationData.value = newFields.paymentDestinationData.value.filter((_field, subI) => {
            console.log(subI, i);
            return subI !== i
          })
          return newFields;
        })
      },
    }
  }))()

  // if (isPaymentDestinationDisabled) {
  //   delete transactionFields.paymentDestination
  //   delete transactionFields.paymentDestinationData
  // }

  const toggleOpen = (status) => {
    setIsOpen(status != undefined ? status : !isOpen)
    setFields({
      description: { value: '' },
      price: { value: '' },
      quantity: { value: '' },
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
    })
  }

  const handleTransactionTypeButtonsClick = (transactionType) => {

    setFields((oldFields) => {
      const newFields = { ...oldFields };
      newFields.transactionType.value = transactionType;
      newFields.paymentDestination.value = '';
      newFields.paymentDestinationData.value = [
        {
          quantity: { value: '' },
          name: { value: '' },
        },
      ];
      return newFields;
    })

    onChange({ target: { name: 'paymentDestination', value: '' } })

  }

  const handleSubmit = () => {
    console.log(fields)
  }

  return (
    <div className={`${styles.headerContainer} ${styles[variation]}`}>
      <div className={styles.headerContent}>

        <div>{Logo(account.color)}</div>

        <div className={styles.accounts}>
          <Button variation={account.id == 0 && 'primary'} onClick={() => handleAccounts(0)}>Conta 1</Button>
          <Button variation={account.id == 1 && 'secondary'} onClick={() => handleAccounts(1)}>Conta 2</Button>
        </div>

        <div className={styles.newTransactionButton}>
          <Button variation={variation} onClick={toggleOpen}>Nova transação</Button>
        </div>

      </div>

      <Modal isOpen={isOpen} toggleOpen={toggleOpen}>
        <div className={styles.modalForm}>
          <h2>Nova Transação</h2>
          {Object.values(transactionFields).map((field) => <Input key={field.name} field={field} setField={setFields} />)}
          <div className={styles.inputButton}>
            <Button onClick={() => { handleTransactionTypeButtonsClick('income') }} variation={fields?.transactionType?.value == "income" ? "primary" : "dark"}><ArrowCircleUp size={24} color={fields?.transactionType?.value == "income" ? "#FFF" : "#00B37E"} /> Entrada</Button>
            <Button onClick={() => onChange({ target: { name: 'transactionType', value: 'outcome' } })} variation={fields?.transactionType?.value == "outcome" ? "red" : "dark"}><ArrowCircleDown size={24} color={fields?.transactionType?.value == "outcome" ? "#FFF" : "#F75A68"} />Saida</Button>
          </div>
          <Button onClick={handleSubmit} variation="primary">Cadastrar</Button>
        </div>
      </Modal>
    </div>
  )
}
