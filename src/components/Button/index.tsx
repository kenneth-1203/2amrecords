import { StyledButton, IconWrapper } from "./styles";

interface PropTypes extends React.HTMLProps<HTMLButtonElement> {
  variant?: "outlined" | "contained" | "text";
  color?: "success" | "error" | "warning";
  center?: boolean;
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button: React.FC<PropTypes> = ({
  children,
  variant = "text",
  center = false,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    //  @ts-ignore
    <StyledButton variant={variant} {...props}>
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
