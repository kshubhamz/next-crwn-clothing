import styles from "./profile-dropdown.styles.module.css";
import { createStructuredSelector } from "reselect";
import { selectUser } from "../../redux/current-user/current-user.selector";
import {
  toggleLoginModal,
  togglelRegisterModal,
  toggleProfileDropdown,
} from "../../redux/profile/profile.actions";
import { connect } from "react-redux";
import { logoutUserAsync } from "../../redux/current-user/current-user.actions";
import { useRouter } from "next/router";

const _ProfileDropdown = ({
  user,
  toggleLoginModel,
  toggleProfileDropdown,
  toggleRegisterModal,
  logOutCurrentUser,
}) => {
  const router = useRouter();

  return (
    <div className={styles.profile_dropdown}>
      {user ? (
        <>
          <p className={styles.hr}>Welcome, {user.name}!!</p>
          <div
            className="pointable text-button"
            onClick={() => {
              router.push({ pathname: "/my-info", query: { view: "profile" } });
              toggleProfileDropdown();
            }}
          >
            My Profile
          </div>
          <div
            className="pointable text-button"
            onClick={() => {
              router.push({ pathname: "/my-info", query: { view: "orders" } });
              toggleProfileDropdown();
            }}
          >
            My Orders
          </div>
          <div
            className="pointable text-button"
            onClick={() => {
              logOutCurrentUser();
              toggleProfileDropdown();
            }}
          >
            Logout
          </div>
        </>
      ) : (
        <div className={styles.nav}>
          <p>You're not logged in.</p>
          <div
            className="text-button pointable"
            style={{ padding: "0" }}
            onClick={() => {
              toggleProfileDropdown();
              toggleLoginModel();
            }}
          >
            Login
          </div>
          <div
            className="text-button pointable"
            style={{ padding: "0" }}
            onClick={() => {
              toggleProfileDropdown();
              toggleRegisterModal();
            }}
          >
            Register
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
  toggleRegisterModal: () => dispatch(togglelRegisterModal()),
  toggleLoginModel: () => dispatch(toggleLoginModal()),
  toggleProfileDropdown: () => dispatch(toggleProfileDropdown()),
  logOutCurrentUser: () => dispatch(logoutUserAsync()),
});

export const ProfileDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ProfileDropdown);
