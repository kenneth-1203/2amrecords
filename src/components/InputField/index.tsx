import Typography from "@/components/Typography";
import {
  InputWrapper,
  InputComponent,
  InputFileWrapper,
  InputFileComponent,
} from "./styles";

interface PropTypes extends React.HTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password" | "number" | "file";
  accept?: string;
  label?: React.ReactNode;
  htmlFor?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  value?: string | number;
  required?: boolean;
}

const InputField: React.FC<PropTypes> = ({
  label,
  htmlFor,
  type,
  fullWidth = false,
  disabled = false,
  required = false,
  ...props
}) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      {type === "file" ? (
        <InputFileWrapper disabled={disabled}>
          {label && <Typography variant="p">{label}</Typography>}
          <InputFileComponent type={type} disabled={disabled} required={required} {...props} />
        </InputFileWrapper>
      ) : (
        <>
          {label && <Typography variant="p">{label}</Typography>}
          <InputComponent type={type} disabled={disabled} required={required} {...props} />
        </>
      )}
    </InputWrapper>
  );
};

export default InputField;
