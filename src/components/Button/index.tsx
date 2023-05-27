import { StyledButton, IconWrapper } from "./styles";

interface PropTypes extends React.HTMLProps<HTMLButtonElement> {
  variant?: "outlined" | "contained" | "text";
  color?: "success" | "error" | "warning";
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<PropTypes> = ({
  children,
  variant = "text",
  fullWidth = false,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    //  @ts-ignore
    <StyledButton variant={variant} fullWidth={fullWidth} {...props}>
      {startIcon && <IconWrapper>{startIcon}</IconWrapper>}
      {children}
      {endIcon && <IconWrapper>{endIcon}</IconWrapper>}
    </StyledButton>
  );
};

export default Button;
