import SubFields from "./InputSubFields";
import InputPrice from "./InputPrice";
import InputText from "./InputText";
import InputSelect from "./InputSelect";

export default function Input(props) {
  const { type } = props.field;

  switch (type) {
    case 'select':
      return <InputSelect {...props} />
    case 'price': 
      return <InputPrice {...props} />;
    case 'subFields':
      return <SubFields {...props} />;
    case 'text':
    default:
      return <InputText {...props} />;
  }
}
