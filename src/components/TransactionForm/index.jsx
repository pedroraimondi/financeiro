import styles from './TransactionForm.module.css';
import Button from '@/elements/Button';
import { toFloat } from '@/utils/formatter';
import axios from 'axios';
import Input from '@/elements/Input';
import { ArrowCircleDown, ArrowCircleUp } from 'phosphor-react';
import Modal from '../Modal/Modal';
import toast from 'react-hot-toast';

export default function TransactionFormModal({ account, fields, setFields, isOpen, toggleOpen, handleSubmit }) {

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
      color: account.color,
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

  const label = fields?.transactionId ? 'Editar' : 'Nova'

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

  const handleSubmitToast = (transactionId) => {
    toast.promise(
      handleSubmit(transactionId),
      {
        loading: 'Salvando transação...',
        success: 'Sucesso',
        error: 'Erro ao tentar salvar transação...'
      },
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    )
  }

  return (
    <Modal isOpen={isOpen} toggleOpen={toggleOpen}>
      <div className={styles.modalForm}>
        <h2>{label} Transação</h2>
        <div className={styles.modalFormGrid}>
          {Object.values(transactionFields).map((field) => <Input key={field.name} field={field} setField={setFields} />)}
          <div className={styles.inputButton}>
            <Button color={fields?.transactionType?.value == "income" && account.color} onClick={() => { handleTransactionTypeButtonsClick('income') }} variation={fields?.transactionType?.value == "income" ? "primary" : "dark"}><ArrowCircleUp size={24} color={fields?.transactionType?.value == "income" ? "#FFF" : account?.color} /> Entrada</Button>
            <Button onClick={() => onChange({ target: { name: 'transactionType', value: 'outcome' } })} variation={fields?.transactionType?.value == "outcome" ? "red" : "dark"}><ArrowCircleDown size={24} color={fields?.transactionType?.value == "outcome" ? "#FFF" : "#F75A68"} />Saida</Button>
          </div>
        </div>
        <Button onClick={() => handleSubmitToast(fields?.transactionId)} variation="primary" color={account.color}>Salvar</Button>
      </div>
    </Modal>
  )
}
