'use client'

import { maskCurrency } from '@/utils/formatter';
import InputText from './InputText';

export default function InputPrice({ field, ...props }) {

  const customOnChange = (e) => {
    // console.log(e)
    const onlyDigits = e?.target?.value
      .split("")
      .filter(s => /\d/.test(s))
      .join("")
      .padStart(3, "0")
      
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);

    e.target.value = maskCurrency(digitsFloat);

    field.onChange(e);
  }

  return (
    <InputText field={{ ...field }} onChange={customOnChange} i={props?.i} />
  );
}
