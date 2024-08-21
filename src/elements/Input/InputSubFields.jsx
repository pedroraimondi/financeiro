import { PlusCircle, Trash } from 'phosphor-react';
import styles from './Input.module.css';
import Input from './index';

export default function SubFields({ field, ...props }) {
  const disabledStyle = field?.disabled && styles.disabled
  return (
    <div style={{ gridArea: field?.name }} className={styles.inputMultipleContainer}>
      <div className={styles.inputMultipleContainerHeader}>
        <span className={`${styles.inputMultipleContainerTitle} ${disabledStyle}`}>{field?.title}</span>
        <div
          className={styles.inputMultipleContainerHeaderButton}
          onClick={() => { !field?.disabled && field?.onAddField() }}
        >
          <PlusCircle size={24} color={field?.disabled ? "#323238" : (field.color || "#00B37E")} />
        </div>
      </div>
      <div className={styles.inputMultipleContainerList}>
        {field?.value?.map((subFieldValue, i) => (
          <div key={i} className={field?.subFieldFormStyle}>
            {Object.values(field.subFields).map((subField) => {
              const value = subFieldValue[subField.name].value;
              const onChange = (e) => { subField.onChange(e.target.value, i) };
              const disabled = field.disabled

              const customField = { ...subField, value, onChange, disabled }

              return <Input key={subField.name} field={customField} i={i} />
            })}

            <div className={styles.removeButton} onClick={() => !field?.disabled && field?.onRemoveField(i)}>
              <Trash size={23} color={field?.disabled ? "#323238" :"#AB222E"} />
            </div>

          </div>
        )
        )}
      </div>
    </div>
  )
}
