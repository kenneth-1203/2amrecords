import { StyledButton, IconWrapper } from "./styles";

interface PropTypes extends React.HTMLProps<HTMLButtonElement> {
  variant?: "outlined" | "contained" | "text";
  color?: "success" | "error" | "warning";
  center?: boolean;
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<PropTypes> = ({
  children,
  variant = "text",
  center = false,
  fullWidth = false,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    //  @ts-ignore
    <StyledButton variant={variant} fullWidth={fullWidth} {...props}>
      {startIcon && <IconWrapper>{startIcon}</IconWrapper>}
      {center ? (
        <span
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          {children}
        </span>
      ) : (
        children
      )}
      {endIcon && <IconWrapper>{endIcon}</IconWrapper>}
    </StyledButton>
  );
};

export default Button;
