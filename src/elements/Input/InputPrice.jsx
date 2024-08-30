'use client'

import { maskCurrency } from '@/utils/formatter';
import InputText from './InputText';

export default function InputPrice(props) {

  const customOnChange = (e) => {

    e.target.value = maskCurrency(e.target.value);

    props.onChange(e);
  }

  return (
    <InputText {...props} onChange={customOnChange} i={props?.i} />
  );
}
