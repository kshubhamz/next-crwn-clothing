import styles from "./cart-item.styles.module.css";

export const CartItem = ({ product, quantity }) => {
  const { imageUrl, title, price } = product;
  return (
    <div className={styles.cart_item}>
      <img className={styles.img} src={imageUrl} alt="item" />
      <div className={styles.item_details}>
        <span className={styles.name}>{title}</span>
        <span>
          {quantity} x ₹{price}
        </span>
      </div>
    </div>
  );
};
