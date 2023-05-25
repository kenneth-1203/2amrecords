import { InputWrapper, InputComponent } from "./styles";

interface PropTypes extends React.HTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password" | "number";
  label?: string;
  htmlFor?: string;
  fullWidth?: boolean;
}

const InputField: React.FC<PropTypes> = ({
  label,
  htmlFor,
  type,
  fullWidth = false,
  ...props
}) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      {label && label}
      <InputComponent type={type} {...props} />
    </InputWrapper>
  );
};

export default InputField;
