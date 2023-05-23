import { ChipContainer, ChipLabel } from "./styles";

const Chip: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ChipContainer>
      <ChipLabel>{children}</ChipLabel>
    </ChipContainer>
  );
};

export default Chip;
