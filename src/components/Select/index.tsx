import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Typography from "@/components/Typography";
import {
  SelectContainer,
  SelectLabel,
  SelectWrapper,
  SelectIconWrapper,
  SelectComponent,
  SelectOption,
  HiddenSelect,
} from "./styles";

type OptionValue = string | number | readonly string[] | undefined;

interface PropTypes extends React.CSSProperties {
  options: Array<{
    label: string;
    value: OptionValue;
  }>;
  value?: OptionValue;
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  onChange?: (value: OptionValue) => void;
}

const Select: React.FC<PropTypes> = ({
  options,
  value,
  label,
  disabled = false,
  fullWidth = false,
  required = false,
  onChange,
  ...props
}) => {
  const [show, setShow] = useState<boolean>(false);

  const handleSelectOption = (optionValue: OptionValue) => {
    onChange && onChange(optionValue);
    setShow(false);
  };

  const findLabelByValue = (value: OptionValue) => {
    const foundOption = options.find((option) => option.value === value);
    return foundOption ? foundOption.label : "";
  };

  return (
    <SelectContainer
      disabled={disabled}
      fullWidth={fullWidth}
      style={{ ...props }}
    >
      {!value && (
        <HiddenSelect defaultValue={value} required={required}></HiddenSelect>
      )}
      <Typography variant="p" paddingBottom={".4rem"}>
        {label}
      </Typography>
      <SelectLabel onClick={() => setShow(!show)}>
        <Typography variant="p" textOverflow="ellipsis" overflow="hidden">
          {findLabelByValue(value)}
        </Typography>
        <SelectIconWrapper animate={{ rotate: show ? 180 : 0 }}>
          <FontAwesomeIcon icon={faChevronDown} />
        </SelectIconWrapper>
      </SelectLabel>
      <AnimatePresence>
        {show ? (
          <SelectWrapper>
            <SelectComponent
              initial={{ height: "0" }}
              animate={{ height: "auto" }}
              exit={{ height: "0" }}
            >
              {options.sort().map((option, i) => (
                <SelectOption
                  key={i}
                  onClick={() => handleSelectOption(option.value)}
                >
                  {option.label}
                </SelectOption>
              ))}
            </SelectComponent>
          </SelectWrapper>
        ) : null}
      </AnimatePresence>
    </SelectContainer>
  );
};

export default Select;
