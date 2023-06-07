import styled, { css } from "styled-components";

export const InputComponent = styled.input`
  border: 1px solid ${(props) => props.theme.colors.primary.main};
  padding: 0.8rem;
  border-radius: 0;
  outline: none;
  font-size: 1rem;
  margin-bottom: 0.4rem;

  &:disabled {
    color: ${(props) => props.theme.colors.primary[200]};
    border-color: ${(props) => props.theme.colors.primary[200]};
    background: inherit;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.primary[100]};
  }
`;

export const InputWrapper = styled.fieldset<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? `100%` : `max-content`)};
  min-width: 4rem;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const InputFileWrapper = styled.div<{ disabled: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 4rem;
  border: 1px solid ${(props) => props.theme.colors.primary.main};
  padding: 0.8rem;
  border-radius: 0;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  transition: 0.2s;

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${(props) => props.theme.colors.primary[300]};
      border-color: ${(props) => props.theme.colors.primary[300]};
    `}
`;

export const InputFileComponent = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  transition: 0.2s;
  cursor: pointer;
`;
