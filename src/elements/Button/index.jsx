import theme from "@/styles/Theme.module.css";

export default function Button({ label, variation, disabled, onClick = () => {}, children }) {
  return (
    <button className={`${theme.button} ${variation && theme[variation]} ${disabled && theme.disabled}`} onClick={onClick}>
      {children || label}
    </button>
  )
}
