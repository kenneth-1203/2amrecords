import styled from "styled-components";

export const InputComponent = styled.input`
  border: 1px solid ${(props) => props.theme.colors.primary.main};
  padding: 0.8rem;
  border-radius: 0;
  outline: none;
  font-size: 1rem;
  margin-bottom: 0.4rem;
`;

export const InputWrapper = styled.fieldset<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? `100%` : `max-content`)};
  border: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;