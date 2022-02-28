import { LinearProgress, TextField } from "@mui/material";
import { useState } from "react";
import { loginUserAsync } from "../../redux/current-user/current-user.actions";
import { CustomButton } from "../custom-button/custom-button.component";
import { selectUserFetchError } from "../../redux/current-user/current-user.selector";
import { connect } from "react-redux";
import { toggleLoginModal } from "../../redux/profile/profile.actions";

const _LoginComponent = ({
  loginError,
  login,
  toggleLoginModal,
  handleSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFormError, setLoginFormError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const submitLoginForm = () => {
    setIsLoggingIn(true);
    login({ email, password })
      .then(() => {
        setIsLoggingIn(false);
        toggleLoginModal();
        handleSuccess();
      })
      .catch(() => {
        setIsLoggingIn(false);
      });
  };

  return (
    <div className="auth">
      {isLoggingIn && <LinearProgress color="info" />}
      <div className="auth-input">
        <TextField
          variant="standard"
          label="Email Address"
          id="email"
          type="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          error={loginFormError}
          onBlur={() =>
            setLoginFormError(
              !/^[a-z][a-z0-9._]+[@][a-z]+[.a-z]+$/i.test(email)
            )
          }
        />
      </div>
      <div className="auth-input">
        <TextField
          variant="standard"
          label="Password"
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
      </div>
      <div>
        <CustomButton
          bindStyles={{ float: "right", width: "30%", marginTop: "20px" }}
          disabled={
            email.trim() === "" || password.trim() === "" || loginFormError
          }
          onClick={submitLoginForm}
        >
          Login
        </CustomButton>
      </div>
      <div
        style={{ marginTop: "10px" }}
        className="alert alert-danger"
        hidden={!loginError}
      >
        {loginError?.message}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (formData) => dispatch(loginUserAsync(formData)),
  toggleLoginModal: () => dispatch(toggleLoginModal()),
});

const mapStateToProps = (state, ownProps) => ({
  loginError: selectUserFetchError(state),
  handleSuccess: ownProps["handleSuccess"],
});

export const LoginComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LoginComponent);
