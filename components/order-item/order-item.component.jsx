import styles from "./order-item.styles.module.css";

export const OrderItem = ({ products }) => {
  return (
    <table style={{ width: "100%" }}>
      <tbody className={styles.order_page}>
        <tr className={styles.order_header}>
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
            <span>Unit Price</span>
          </th>
        </tr>
        {products.map((item) => {
          const { quantity, product } = item;
          const { title, imageUrl, price } = product;
          return (
            <tr key={item.id} className={styles.order_item}>
              <td className={styles.image_container}>
                <img className={styles.img} src={imageUrl} alt="item" />
              </td>
              <td className={styles.name}>
                <span>{title}</span>
              </td>
              <td className={styles.quantity}>
                <span className={styles.value}> {quantity} </span>
              </td>
              <td className={styles.price}>₹ {price}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
