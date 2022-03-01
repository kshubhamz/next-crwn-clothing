import { TextField } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { updatePasswordAsync } from "../../redux/current-user/current-user.actions";
import { selectUser } from "../../redux/current-user/current-user.selector";
import { CustomButton } from "../custom-button/custom-button.component";
import styles from "./update-password.styles.module.css";

const _UpdatePasswordComponent = ({ user, updatePassword, onReqFinish }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cnfNewPassword, setCnfNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdatePassword = () => {
    if (newPassword !== cnfNewPassword) {
      setError("Password and Confirm Password not matching.");
      return;
    }
    onReqFinish(true);
    setError(null);
    setSuccess(null);
    updatePassword(user, { oldPassword, newPassword })
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
          type="password"
          label="Current Password"
          required={true}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="auth-input" style={{ padding: "10px" }}>
        <TextField
          className={styles.field}
          variant="standard"
          type="password"
          label="New Password"
          required={true}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="auth-input" style={{ padding: "10px" }}>
        <TextField
          className={styles.field}
          variant="standard"
          type="password"
          label="Confirm New Password"
          required={true}
          onChange={(e) => setCnfNewPassword(e.target.value)}
        />
      </div>
      <CustomButton
        bindStyles={{ marginLeft: "auto", marginTop: "20px" }}
        disabled={
          newPassword.trim() === "" ||
          cnfNewPassword.trim() === "" ||
          oldPassword.trim() === ""
        }
        onClick={handleUpdatePassword}
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
  updatePassword: (user, form) => dispatch(updatePasswordAsync(user, form)),
});

export const UpdatePasswordComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(_UpdatePasswordComponent);
