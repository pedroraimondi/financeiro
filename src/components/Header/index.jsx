import Image from 'next/image';
import styles from './Header.module.css'
import Button from '@/elements/Button';
import Logo from '../../../public/logo';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import Input from '@/elements/Input';
import { ArrowCircleUp, ArrowCircleDown } from 'phosphor-react'
import axios from 'axios';

export default function Header({ account, handleAccounts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({
    description: { value: '' },
    price: { value: '' },
    category: { value: '' },
    transactionType: { value: '' },
    paymentDestination: { value: '' },
    paymentDestinationData: { value: '' },
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

  const transactionFields = {
    description: {
      ...fields.description,
      name: 'description',
      type: 'text',
      placeholder: 'Descrição',
      onChange
    },
    price: {
      ...fields.price,
      name: 'price',
      type: 'number',
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
      options: [
        { label: 'Prestador', value: 'Prestador' },
        { label: 'Empresa', value: 'Empresa' },
      ],
      onChange
    },
    paymentDestinationData: {
      ...fields.paymentDestinationData,
      name: 'paymentDestinationData',
      type: 'text',
      placeholder: 'Prestador/Empresa',
      onChange
    }
  }

  if (fields?.transactionType?.value != 'outcome') {
    delete transactionFields.paymentDestination
    delete transactionFields.paymentDestinationData
  }

  const toggleOpen = (status) => {
    setIsOpen(status != undefined ? status : !isOpen)
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
        <div className={styles.modalForm}>
          <h2>Nova Transação</h2>
          {Object.values(transactionFields).map((field) => <Input key={field.name} field={field} setField={setFields} />)}
          <div className={styles.inputButton}>
            <Button onClick={() => onChange({ target: { name: 'transactionType', value: 'income' } })} variation={fields?.transactionType?.value == "income" ? "primary" : "dark"}><ArrowCircleUp size={32} color={fields?.transactionType?.value == "income" ? "#FFF" : "#00B37E"}/> Entrada</Button>
            <Button onClick={() => onChange({ target: { name: 'transactionType', value: 'outcome' } })} variation={fields?.transactionType?.value == "outcome" ? "red" : "dark"}><ArrowCircleDown size={32} color={fields?.transactionType?.value == "outcome" ? "#FFF" : "#F75A68"}/>Saida</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
