import {
  ListContainer,
  ListItem,
  ListItemContainer,
  ListItemIcon,
} from "./styles";

type ItemValue = string | number | null | undefined;

interface PropTypes {
  items: Array<{
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    disabled?: boolean;
    label: string;
    value: ItemValue;
  }>;
  onSelect?: (index: number) => void | undefined;
  value?: number | undefined;
  fullWidth?: boolean;
}

const List: React.FC<PropTypes> = ({
  items,
  onSelect,
  value,
  fullWidth = false,
}) => {
  const handleSelect = (index: number) => {
    if (onSelect) {
      if (index === value) {
        onSelect(-1);
      } else {
        onSelect(index);
      }
    }
  };

  return (
    <ListContainer fullWidth={fullWidth}>
      {items &&
        items.map((item, i) => (
          <ListItemContainer
            key={i}
            onClick={item.disabled ? undefined : () => handleSelect(i)}
            selected={value === i}
            disabled={item.disabled || false}
          >
            {item.leftIcon && <ListItemIcon>{item.leftIcon}</ListItemIcon>}
            <ListItem>{item.label}</ListItem>
            {item.rightIcon && (
              <ListItemIcon style={{ marginLeft: "auto" }}>
                {item.rightIcon}
              </ListItemIcon>
            )}
          </ListItemContainer>
        ))}
    </ListContainer>
  );
};

export default List;
