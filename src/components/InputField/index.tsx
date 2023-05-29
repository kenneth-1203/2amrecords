import {
  InputWrapper,
  InputComponent,
  InputFileWrapper,
  InputFileComponent,
} from "./styles";

interface PropTypes extends React.HTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password" | "number" | "file";
  label?: React.ReactNode;
  htmlFor?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  value?: string | number;
}

const InputField: React.FC<PropTypes> = ({
  label,
  htmlFor,
  type,
  fullWidth = false,
  disabled = false,
  ...props
}) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      {type === "file" ? (
        <InputFileWrapper disabled={disabled}>
          {label && label}
          <InputFileComponent type={type} disabled={disabled} {...props} />
        </InputFileWrapper>
      ) : (
        <>
          {label && label}
          <InputComponent type={type} disabled={disabled} {...props} />
        </>
      )}
    </InputWrapper>
  );
};

export default InputField;
