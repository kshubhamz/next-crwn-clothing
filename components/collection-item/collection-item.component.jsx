import styles from "./collection-item.styles.module.css";
import { CustomButton } from "../custom-button/custom-button.component";
import { addToCartAsync } from "../../redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { selectUser } from "../../redux/current-user/current-user.selector";
import { connect } from "react-redux";
import { selectCartOpsError } from "../../redux/cart/cart.selector";
import { useState } from "react";
import { SnackbarWrapper } from "../snack-wrapper/snack-bar-wrapper.component";

const _CollectionItem = ({ item, addItem, user, addCartError }) => {
  const { title, price, imageUrl } = item;
  const [openSnackBar, setOpenSnackBar] = useState(false);

  return (
    <div className={`${styles.collection_item} col col-md-auto`}>
      <div className={`${styles.card} card`} style={{ width: "18rem" }}>
        <img src={imageUrl} className={styles.image} alt={`${title}-img`} />
        <div className={`${styles.card_body} card-body`}>
          <span className={styles.name}>{title}</span>
          <span className={styles.price}>₹ {price}</span>
        </div>
        <CustomButton
          bindClass={styles.custom_button}
          inverted
          onClick={() => {
            addItem(item, user);
            setOpenSnackBar(!!addCartError);
          }}
        >
          Add To Cart
        </CustomButton>
      </div>
      <SnackbarWrapper
        open={openSnackBar}
        severity="error"
        setOpen={setOpenSnackBar}
        message={addCartError?.message}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item, user) => dispatch(addToCartAsync(user, item)),
});

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  addCartError: selectCartOpsError,
});

export const CollectionItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CollectionItem);
