import InputText from "./InputText";

export default function Input(props) {
  const { type } = props;

  switch (type) {
    case 'text':
    default:
      return <InputText {...props} />;
  }
}
