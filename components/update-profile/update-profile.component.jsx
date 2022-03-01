import styles from "./update-profile.styles.module.css";
import { selectUser } from "../../redux/current-user/current-user.selector";
import { updateProfileAsync } from "../../redux/current-user/current-user.actions";
import { connect } from "react-redux";
import { TextField } from "@mui/material";
import { useState } from "react";
import { CustomButton } from "../custom-button/custom-button.component";

const _UpdateProfileComponent = ({ user, updateProfile, onReqFinish }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdateProfile = () => {
    setError(null);
    setSuccess(null);
    onReqFinish(true);
    updateProfile(user, { name, email })
      .then((msg) => {
        setSuccess(msg);
        onReqFinish(false);
      })
      .catch((err) => {
        setError(err);
        onReqFinish(false);
      });
  };

  return (
    <div className={styles.profile}>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="auth-input" style={{ padding: "10px" }}>
        <TextField
          className={styles.field}
          variant="standard"
          type="text"
          label="Name"
          value={name}
          required={true}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="auth-input" style={{ padding: "10px" }}>
        <TextField
          className={styles.field}
          variant="standard"
          type="email"
          label="Email Address"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <CustomButton
        bindStyles={{ marginLeft: "auto", marginTop: "20px" }}
        disabled={name.trim() === "" || email.trim() === ""}
        onClick={handleUpdateProfile}
      >
        Update
      </CustomButton>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: selectUser(state),
  onReqFinish: ownProps["onReqFinish"],
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (user, form) => dispatch(updateProfileAsync(user, form)),
});

export const UpdateProfileComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(_UpdateProfileComponent);
