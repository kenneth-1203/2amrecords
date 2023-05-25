import { InputWrapper, InputComponent } from "./styles";

interface PropTypes extends React.HTMLAttributes<HTMLInputElement> {
  label?: string;
  htmlFor?: string;
  fullWidth?: boolean;
}

const InputField: React.FC<PropTypes> = ({
  label,
  htmlFor,
  fullWidth = false,
  ...props
}) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      {label && label}
      <InputComponent {...props} />
    </InputWrapper>
  );
};

export default InputField;
