'use client'

import InputText from './InputText';

export default function InputPrice({ field, ...props }) {

  console.log(field, props)

  const onBlur = ({ target: { value } }) => {
    return field.onChange({
      target: {
        value: value
          ?.replace(/\D/g, '') // Remove qualquer caractere que não seja dígito
          ?.replace(/(\d)(\d{2})$/, '$1,$2') // Adiciona a vírgula antes dos últimos dois dígitos
          ?.replace(/(?=(\d{3})+(\D))\B/g, '.') // Adiciona o ponto como separador de milhar
          ?.replace(/^/, 'R$ '), // Adiciona o símbolo R$ no início
        name: field.name
      },
    });
  }

  return (
    <InputText field={{ ...field }} onBlur={onBlur} i={props?.i} />
  );
}
