import styles from './Input.module.css'

export default function InputText({ i, ...props }) {

  const onChange = (e) => { props.onChange(e, i) }

  return (
    <input style={{ gridArea: props?.name }} className={`${styles.input} ${props?.disabled && styles.disabled}`} {...props} onChange={onChange} {...props} />
  )
}
