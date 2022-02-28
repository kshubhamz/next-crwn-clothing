import styles from "./view-profile.styles.module.css";
import { createStructuredSelector } from "reselect";
import { selectUser } from "../../redux/current-user/current-user.selector";
import { connect } from "react-redux";

const _ViewProfile = ({ user }) => {
  return (
    <table className={styles.profile}>
      <tbody>
        <tr className={styles.row}>
          <td className={styles.data}>
            <span className={styles.bold}>Name </span>
          </td>
          <td className={styles.data}>
            <span>{user.name}</span>
          </td>
        </tr>
        <tr className={styles.row}>
          <td className={styles.data}>
            <span className={styles.bold}>Email </span>
          </td>
          <td className={styles.data}>
            <span>{user.email}</span>
          </td>
        </tr>
        <tr className={styles.row}>
          <td className={styles.data}>
            <span className={styles.bold}>Orders Placed </span>
          </td>
          <td className={styles.data}>
            <span>{user.ordersPlaced.length}</span>
          </td>
        </tr>
        <tr className={styles.row}>
          <td className={styles.data}>
            <span className={styles.bold}>Items in Cart </span>
          </td>
          <td className={styles.data}>
            <span>{user.currentCartItems.length}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export const ViewProfile = connect(mapStateToProps)(_ViewProfile);
