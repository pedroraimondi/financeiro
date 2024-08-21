import theme from "@/styles/Theme.module.css";

export default function Button({ label, variation, disabled, onClick = () => {}, color, children }) {
  return (
    <button style={{ backgroundColor: color }} className={`${theme.button} ${variation && theme[variation]} ${disabled && theme.disabled}`} onClick={onClick}>
      {children || label}
    </button>
  )
}
