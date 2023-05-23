import styled from "styled-components";

export const InputComponent = styled.input`
  border: 1px solid ${(props) => props.theme.colors.primary.main};
  padding: 0.6rem;
  border-radius: 0;
  outline: none;
  font-size: 1rem;
  margin-bottom: 0.4rem;
`;

const InputWrapper = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  gap: .4rem;
`;

interface PropTypes extends React.HTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password" | "number";
  label?: string;
  htmlFor?: string;
}

const InputField: React.FC<PropTypes> = ({
  label,
  htmlFor,
  type,
  ...props
}) => {
  return (
    <InputWrapper>
      {label && label}
      <InputComponent type={type} {...props} />
    </InputWrapper>
  );
};

export default InputField;
