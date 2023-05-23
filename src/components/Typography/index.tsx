export interface PropTypes extends React.CSSProperties {
  variant?: "h1" | "h2" | "h3" | "p" | "small";
  fontWeight?: 300 | 500 | 700 | 900;
  children?: any;
}

const Typography: React.FC<PropTypes> = ({
  children,
  variant = "p",
  fontWeight = 300,
  ...props
}) => {
  switch (variant) {
    case "h1":
      return (
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight,
            textTransform: "uppercase",
            ...props,
          }}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          style={{
            fontSize: "1.6rem",
            fontWeight,
            textTransform: "uppercase",
            ...props,
          }}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight,
            textTransform: "uppercase",
            ...props,
          }}
        >
          {children}
        </h3>
      );
    case "p":
      return (
        <p style={{ fontSize: "1rem", fontWeight, ...props }}>{children}</p>
      );
    case "small":
      return (
        <small style={{ fontSize: ".8rem", fontWeight, ...props }}>
          {children}
        </small>
      );
  }
};

export default Typography;
