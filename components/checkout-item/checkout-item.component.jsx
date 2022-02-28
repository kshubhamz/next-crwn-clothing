import {
  addToCartAsync,
  deleteFromCartAsync,
  removeFromCartAsync,
} from "../../redux/cart/cart.actions";
import styles from "./checkout-item.styles.module.css";
import { connect } from "react-redux";

const _CheckOutItem = ({ cartItem, user, addItem, removeItem, clearItem }) => {
  const { quantity, product } = cartItem;
  const { imageUrl, price, title } = product;

  return (
    <tr className={styles.checkout_item}>
      <td className={styles.image_container}>
        <img className={styles.img} src={imageUrl} alt="item" />
      </td>
      <td className={styles.name}>
        <span>{title}</span>
      </td>
      <td className={styles.quantity}>
        <div className={styles.arrow} onClick={() => removeItem(user, product)}>
          &#10094;
        </div>
        <span className={styles.value}> {quantity} </span>
        <div className={styles.arrow} onClick={() => addItem(user, product)}>
          &#10095;
        </div>
      </td>
      <td className={styles.price}>₹ {price}</td>
      <td>
        <span
          onClick={() => clearItem(user, product)}
          className={`pointable ${styles.remove_button}`}
        >
          &#10005;
        </span>
      </td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (user, item) => dispatch(deleteFromCartAsync(user, item)),
  addItem: (user, item) => dispatch(addToCartAsync(user, item)),
  removeItem: (user, item) => dispatch(removeFromCartAsync(user, item)),
});

export const CheckoutItem = connect(null, mapDispatchToProps)(_CheckOutItem);
