import Link from "next/link";
import { ChipContainer, ChipLabel, OfferTag } from "./styles";

interface PropTypes extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  to?: string;
  variant?: "primary" | "secondary";
  color?: "blue" | "green" | "orange" | "red";
  active?: boolean;
  disabled?: boolean;
}

const Chip: React.FC<PropTypes> = ({
  children,
  to,
  variant = "primary",
  color = "blue",
  active = false,
  disabled = false,
  ...props
}) => {
  return (
    <div {...props}>
      {to && !disabled ? (
        <Link href={to}>
          {variant === "primary" ? (
            <ChipContainer disabled={disabled}>
              <ChipLabel>{children}</ChipLabel>
            </ChipContainer>
          ) : variant === "secondary" ? (
            <OfferTag active={active} color={color}>
              {children}
            </OfferTag>
          ) : null}
        </Link>
      ) : (
        <>
          {variant === "primary" ? (
            <ChipContainer disabled={disabled}>
              <ChipLabel>{children}</ChipLabel>
            </ChipContainer>
          ) : variant === "secondary" ? (
            <OfferTag active={active} color={color}>
              {children}
            </OfferTag>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Chip;
