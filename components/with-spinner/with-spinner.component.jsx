import styles from "./with-spinner.styles.module.css";

export const WithSpinner =
  (WrappedComponent) =>
  ({ isLoading, ...otherProps }) =>
    isLoading ? (
      <div className={styles.spinner_overlay}>
        <div className={styles.lds_ripple}>
          <div></div>
          <div></div>
        </div>
      </div>
    ) : (
      <WrappedComponent {...otherProps} />
    );

export const SpinnerComponent = () => (
  <div className={styles.spinner_overlay}>
    <div className={styles.lds_ripple}>
      <div></div>
      <div></div>
    </div>
  </div>
);
