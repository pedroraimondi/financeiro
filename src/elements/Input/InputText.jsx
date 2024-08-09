import styles from './Input.module.css'

export default function InputText({ field, ...props }) {

  return (
    <input className={`${styles.input} ${field.disabled && styles.disabled}`} {...field} {...props} />
  )
}
