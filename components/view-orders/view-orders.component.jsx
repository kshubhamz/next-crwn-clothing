import styles from "./view-orders.styles.module.css";
import { createStructuredSelector } from "reselect";
import { selectUser } from "../../redux/current-user/current-user.selector";
import { connect } from "react-redux";
import { useState } from "react";
import { OrderItem } from "../order-item/order-item.component";

const _ViewOrder = ({ order }) => {
  const { id, price, products, stripeId, createdAt } = order;
  const [expand, setExpand] = useState(false);
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const orderDate = new Date(createdAt).toLocaleString("en-IN", options);
  let orderHeader;
  if (products.length === 1) {
    orderHeader = <span>{products[0].product.title}</span>;
  } else {
    orderHeader = (
      <span>
        {products[0].product.title}{" "}
        <span style={{ marginLeft: "2 rem" }}>
          {" "}
          + {products.length - 1} More
        </span>
      </span>
    );
  }

  return (
    <div className={`${styles.order} card`}>
      <div
        className={`${styles.order_header} card-header hoverable`}
        onClick={() => setExpand(!expand)}
      >
        <p>{orderHeader}</p>
        <p>AMOUNT : ₹{price}</p>
        <p>{orderDate}</p>
      </div>
      <div className={`${styles.order_body} card-body`} hidden={!expand}>
        <p>
          <span style={{ fontWeight: "bold" }}>ORDER ID: </span> {id}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>PAYMENT ID: </span> {stripeId}
        </p>
        <OrderItem products={products} />
      </div>
    </div>
  );
};

const _ViewOrders = ({ user }) => {
  const { ordersPlaced } = user;
  const placedOrders = [...ordersPlaced];
  placedOrders.reverse();

  return (
    <>
      {placedOrders.map((order) => (
        <_ViewOrder key={order.id} order={order} />
      ))}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export const ViewOrders = connect(mapStateToProps)(_ViewOrders);
