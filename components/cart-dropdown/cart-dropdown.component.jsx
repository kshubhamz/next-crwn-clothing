import { CartItem } from "../cart-item/cart-item.component";
import styles from "./cart-dropdown.styles.module.css";
import router from "next/router";
import { CustomButton } from "../custom-button/custom-button.component";

export const CartDropdown = ({ toggleCart, cartItems, hidden }) => {
  return (
    <div className={styles.cart_dropdown} hidden={hidden}>
      <div className={styles.cart_items}>
        {cartItems.length ? (
          cartItems.map((item) => (
            <CartItem key={item.product.id} {...item}></CartItem>
          ))
        ) : (
          <span className={styles.empty_message}>Your cart is empty</span>
        )}
      </div>
      <CustomButton
        bindStyles={{ marginTop: "auto" }}
        onClick={() => {
          toggleCart();
          router.push("/checkout");
        }}
      >
        Go to Checkout
      </CustomButton>
    </div>
  );
};
