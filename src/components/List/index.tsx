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
    label: React.ReactNode;
    value?: ItemValue;
  }>;
  onSelect?: (index: number) => void | undefined;
  value?: number | undefined;
  noSelect?: boolean;
}

const List: React.FC<PropTypes> = ({
  items,
  onSelect,
  value = undefined,
  noSelect = false,
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
    <ListContainer>
      {items &&
        items.map((item, i) => (
          <ListItemContainer
            key={i}
            noSelect={noSelect}
            onClick={item.disabled ? undefined : () => handleSelect(i)}
            selected={value === i ?? false}
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
