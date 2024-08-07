import theme from "@/styles/Theme.module.css";

export default function Button({ label, variation, onClick = () => {}, children }) {
  return (
    <button className={`${theme.button} ${variation && theme[variation]}`} onClick={onClick}>
      {children || label}
    </button>
  )
}
