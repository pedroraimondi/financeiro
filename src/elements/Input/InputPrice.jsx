'use client'

import { maskCurrency } from '@/utils/formatter';
import InputText from './InputText';

export default function InputPrice({ field, ...props }) {

  const customOnChange = (e) => {

    e.target.value = maskCurrency(e.target.value);

    field.onChange(e);
  }

  return (
    <InputText field={{ ...field }} onChange={customOnChange} i={props?.i} />
  );
}
