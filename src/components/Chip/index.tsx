import Link from "next/link";
import { ChipContainer, ChipLabel, OfferTag } from "./styles";

interface PropTypes extends React.CSSProperties {
  children: React.ReactNode;
  to?: string;
  variant?: "primary" | "secondary";
  color?: "blue" | "green" | "orange" | "red";
  active?: boolean;
}

const Chip: React.FC<PropTypes> = ({
  children,
  to,
  variant = "primary",
  color = "blue",
  active = false,
  ...props
}) => {
  return (
    <div style={{ ...props }}>
      {to ? (
        <Link href={to}>
          {variant === "primary" ? (
            <ChipContainer>
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
            <ChipContainer>
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
