import styles from "./custom-button.styles.module.css";

export const CustomButton = ({
  children,
  bindClass,
  bindStyles,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${styles.custom_button} ${inverted ? styles.inverted : ""} ${
      bindClass ? bindClass : ""
    }`}
    style={bindStyles ? bindStyles : {}}
    {...otherProps}
  >
    {children}
  </button>
);
