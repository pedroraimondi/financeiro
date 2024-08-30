import SubFields from "./InputSubFields";
import InputPrice from "./InputPrice";
import InputText from "./InputText";
import InputSelect from "./InputSelect";

export default function Input(props) {
  const { type, name } = props;

  switch (type) {
    case 'select':
      return <div id={"select-" + name} style={{ gridArea: name, border: '2px solid #202024', borderRadius: '6px', width: '100%' }}><InputSelect {...props} /></div>
    case 'price': 
      return <InputPrice {...props} />;
    case 'subFields':
      return <SubFields {...props} />;
    case 'text':
    default:
      return <InputText {...props} />;
  }
}
