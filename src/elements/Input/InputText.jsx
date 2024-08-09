import styles from './Input.module.css'

export default function InputText({ field, i, ...props }) {
  console.log(field);

  const onChange = (e) => { field.onChange(e, i) }

  return (
    <input style={{ gridArea: field?.name }} className={`${styles.input} ${field?.disabled && styles.disabled}`} {...field} onChange={onChange} {...props} />
  )
}
