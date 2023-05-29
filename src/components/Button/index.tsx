import { StyledButton, IconWrapper } from "./styles";

interface PropTypes extends React.HTMLProps<HTMLButtonElement> {
  variant?: "outlined" | "contained" | "text";
  color?: "success" | "error" | "warning";
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  selected?: boolean;
}

const Button: React.FC<PropTypes> = ({
  children,
  variant = "text",
  fullWidth = false,
  startIcon,
  endIcon,
  selected,
  ...props
}) => {
  return (
    //  @ts-ignore
    <StyledButton variant={variant} fullWidth={fullWidth} selected={selected} {...props}>
      {startIcon && <IconWrapper style={{ left: "0", margin: "0.8rem" }}>{startIcon}</IconWrapper>}
      {endIcon && <IconWrapper style={{ right: "0", margin: "0.8rem" }}>{endIcon}</IconWrapper>}
      {children}
    </StyledButton>
  );
};

export default Button;
