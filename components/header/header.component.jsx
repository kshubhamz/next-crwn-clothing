import { useRouter } from "next/router";
import styles from "./header.styles.module.css";
import Link from "next/link";
import { connect } from "react-redux";
import { fetchCurrentUserAsync } from "../../redux/current-user/current-user.actions";
import {
  selectAuthSusscessMessage,
  selectUser,
} from "../../redux/current-user/current-user.selector";
import { useState } from "react";
import {
  selectCartItems,
  selectNoOfItemsInCart,
  selectShouldCartDisplay,
} from "../../redux/cart/cart.selector";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { CartDropdown } from "../cart-dropdown/cart-dropdown.component";
import { ProfileDropdown } from "../profile-dropdown/profile-dropdown.component";
import {
  selectLoginModalHidden,
  selectProfileDropdownHidden,
  selectRegisterModalHidden,
} from "../../redux/profile/profile.selector";
import {
  toggleLoginModal,
  togglelRegisterModal,
  toggleProfileDropdown,
} from "../../redux/profile/profile.actions";
import { Modal } from "../modal/modal.component";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { SnackbarWrapper } from "../snack-wrapper/snack-bar-wrapper.component";

const _HeaderComponent = ({
  user,
  fetchCurrentUser,
  toggleCartHidden,
  cartShouldDisplay,
  cartItems,
  profileDropdownHidden,
  toggleProfileDropdown,
  registerModalHidden,
  loginModalHidden,
  toggleLoginModal,
  toggleRegisterModal,
  quantity,
  authMsg,
}) => {
  const router = useRouter();
  const [openSnack, setOpenSnack] = useState(false);

  const handleLoginRegisterSuccess = () => {
    setOpenSnack(true);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/crown.svg"
              alt="CRWN-CLOTHING"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/">
                  <a
                    className={`nav-link${
                      router.pathname === "/" ? " active" : ""
                    }`}
                  >
                    HOME
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/shop">
                  <a
                    className={`nav-link${
                      router.pathname === "/shop" ? " active" : ""
                    }`}
                  >
                    SHOP
                  </a>
                </Link>
              </li>
            </ul>
            <div className="d-flex navbar-text">
              <div
                className="profile pointable"
                title={user ? `${user.name}\n${user.email}` : "Profile"}
                onClick={toggleProfileDropdown}
              >
                <i className="bi bi-person-circle"></i>
              </div>
              <div
                className="cart-logo pointable"
                onClick={toggleCartHidden}
                title="Cart"
              >
                <i className="bi bi-bag"></i>
                <span
                  style={quantity < 10 ? { marginLeft: "5px" } : {}}
                  className="cart-item-count"
                >
                  {quantity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <CartDropdown
        toggleCart={toggleCartHidden}
        cartItems={cartItems}
        hidden={!cartShouldDisplay}
      />
      {!profileDropdownHidden && <ProfileDropdown />}
      <Modal
        title="Login"
        show={!loginModalHidden}
        onClose={toggleLoginModal}
        body={<LoginComponent handleSuccess={handleLoginRegisterSuccess} />}
      />
      <Modal
        title="Register"
        show={!registerModalHidden}
        onClose={toggleRegisterModal}
        body={<RegisterComponent handleSuccess={handleLoginRegisterSuccess} />}
      />
      <SnackbarWrapper
        open={openSnack}
        message={authMsg}
        setOpen={setOpenSnack}
        severity="success"
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUserAsync()),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  toggleProfileDropdown: () => dispatch(toggleProfileDropdown()),
  toggleLoginModal: () => dispatch(toggleLoginModal()),
  toggleRegisterModal: () => dispatch(togglelRegisterModal()),
});

const mapStateToProps = (state, ownProps) => {
  return {
    user: selectUser(state),
    cartShouldDisplay: selectShouldCartDisplay(state),
    cartItems: selectCartItems(state),
    profileDropdownHidden: selectProfileDropdownHidden(state),
    registerModalHidden: selectRegisterModalHidden(state),
    loginModalHidden: selectLoginModalHidden(state),
    quantity: selectNoOfItemsInCart(state),
    authMsg: selectAuthSusscessMessage(state),
  };
};

export const HeaderComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(_HeaderComponent);
