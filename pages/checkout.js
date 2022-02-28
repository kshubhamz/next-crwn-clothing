import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { CheckoutItem } from "../components/checkout-item/checkout-item.component";
import { selectCartItems, selectCartTotal } from "../redux/cart/cart.selector";
import { selectUser } from "../redux/current-user/current-user.selector";
import styles from "../styles/Checkout.module.css";
import StripeCheckout from "react-stripe-checkout";
import { environment } from "../environment";
import { placeOrderAsync } from "../redux/order/order.actions";
import { fetchCurrentUserAsync } from "../redux/current-user/current-user.actions";
import { useState } from "react";
import { useRouter } from "next/router";
import { SpinnerComponent } from "../components/with-spinner/with-spinner.component";
import { selectOrderPlaceError } from "../redux/order/order.selector";

const CheckoutPage = ({
  cartItems,
  cartTotal,
  user,
  placeOrder,
  fetchCurrentUser,
  orderPlaceError,
}) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();

  const chargePayment = (token) => {
    setShowSpinner(true);
    placeOrder(token, cartItems)
      .then(() => {
        fetchCurrentUser();
        setShowSpinner(false);
        router.push({ pathname: "/my-info", query: { view: "orders" } });
      })
      .catch(() => {
        setShowSpinner(false);
      });
  };

  return (
    <div>
      {showSpinner && <SpinnerComponent />}
      {orderPlaceError && (
        <div className="alert alert-danger">{orderPlaceError?.message}</div>
      )}
      {cartItems.length ? (
        <table style={{ width: "100%" }}>
          <tbody className={styles.checkout_page}>
            <tr className={styles.checkout_header}>
              <th className={styles.header_block}>
                <span>Product</span>
              </th>
              <th className={styles.header_block}>
                <span>Description</span>
              </th>
              <th className={styles.header_block}>
                <span>Quantity</span>
              </th>
              <th className={styles.header_block}>
                <span>Price</span>
              </th>
              <th className={styles.header_block}>
                <span>Remove</span>
              </th>
            </tr>
            {cartItems.map((cartItem) => (
              <CheckoutItem
                user={user}
                key={`${cartItem.product.id}${cartItem.quantity}`}
                cartItem={cartItem}
              />
            ))}
            <tr className={styles.total}>
              <td>TOTAL: ₹{cartTotal}</td>
            </tr>
            <tr className={styles.payment}>
              {user ? (
                <td>
                  <StripeCheckout
                    token={({ id }) => chargePayment(id)}
                    stripeKey={environment.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
                    amount={cartTotal * 100}
                    email={user.email}
                    currency="INR"
                  />
                </td>
              ) : (
                <td className="alert alert-warning">
                  Please Login/Register to make any payment.
                </td>
              )}
            </tr>
          </tbody>
          <tfoot style={{ display: "flex", justifyContent: "center" }}>
            <tr>
              <td>
                <div className={`alert alert-info ${styles.test_warning}`}>
                  Please use following card details for testing <br />
                  Card No. : 4242 4242 4242 4242 <br />
                  Expiry Date : Any future date <br />
                  CVV : Any 3 digit number <br />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <h3 style={{ display: "flex", justifyContent: "center" }}>
          Please add product in cart to see checkout page. Thank You!!
        </h3>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal,
  user: selectUser,
  orderPlaceError: selectOrderPlaceError,
});

const mapDispatchToProps = (dispatch) => ({
  placeOrder: (token, cart) => dispatch(placeOrderAsync(token, cart)),
  fetchCurrentUser: () => dispatch(fetchCurrentUserAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
