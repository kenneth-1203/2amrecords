import Link from "next/link";
import { ChipContainer, ChipLabel } from "./styles";

interface PropTypes extends React.PropsWithChildren {
  to?: string;
}

const Chip: React.FC<PropTypes> = ({ children, to }) => {
  return (
    <>
      {to ? (
        <Link href={to}>
          <ChipContainer>
            <ChipLabel>{children}</ChipLabel>
          </ChipContainer>
        </Link>
      ) : (
        <ChipContainer>
          <ChipLabel>{children}</ChipLabel>
        </ChipContainer>
      )}
    </>
  );
};

export default Chip;
