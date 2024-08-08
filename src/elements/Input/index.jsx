import InputPrice from "./InputPrice";
import InputText from "./InputText";
import InputSelect from "./inputSelect";

export default function Input(props) {
  const { type } = props.field;

  switch (type) {
    case 'select':
      return <InputSelect {...props} />
    case 'price': 
      return <InputPrice {...props} />;
    case 'text':
    default:
      return <InputText {...props} />;
  }
}
