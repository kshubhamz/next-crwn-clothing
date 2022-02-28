import { LinearProgress, TextField } from "@mui/material";
import { useState } from "react";
import { registerUserAsync } from "../../redux/current-user/current-user.actions";
import { CustomButton } from "../custom-button/custom-button.component";
import { selectUserFetchError } from "../../redux/current-user/current-user.selector";
import { connect } from "react-redux";
import { togglelRegisterModal } from "../../redux/profile/profile.actions";

const _RegisterComponent = ({
  registerError,
  register,
  toggleRegisterModal,
  handleSuccess,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [nameInvalid, setNameInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [cnfPwdInvalid, setCnfPwdInvalid] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const submitRegisterForm = () => {
    if (password !== cnfPassword) {
      setCnfPwdInvalid(true);
      return;
    }
    setIsRegistering(true);
    register({
      email: email.trim(),
      password: password.trim(),
      name: name.trim(),
    })
      .then(() => {
        setIsRegistering(false);
        toggleRegisterModal();
        handleSuccess();
      })
      .catch(() => {
        setIsRegistering(false);
      });
  };

  return (
    <div className="auth">
      {isRegistering && <LinearProgress color="info" />}
      <div className="auth-input">
        <TextField
          variant="standard"
          label="Name"
          id="name"
          type="text"
          required={true}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameInvalid(!/^[A-Z][A-Za-z ]+$/.test(name))}
          error={nameInvalid}
        />
      </div>
      <div className="auth-input">
        <TextField
          variant="standard"
          label="Email Address"
          id="email"
          type="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          error={emailInvalid}
          onBlur={() =>
            setEmailInvalid(!/^[a-z][a-z0-9._]+[@][a-z]+[.a-z]+$/i.test(email))
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
          error={passwordInvalid}
          onBlur={() => {
            setPasswordInvalid(
              !/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(
                password
              )
            );
            if (cnfPassword.length > 0)
              setCnfPwdInvalid(password !== cnfPassword);
          }}
        />
      </div>
      <div className="auth-input">
        <TextField
          variant="standard"
          label="Confirm Password"
          id="cnfPassword"
          type="password"
          required={true}
          onChange={(e) => setCnfPassword(e.target.value)}
          error={cnfPwdInvalid}
          onBlur={() => setCnfPwdInvalid(password !== cnfPassword)}
        />
      </div>
      <div>
        <CustomButton
          bindStyles={{ float: "right", width: "30%", marginTop: "20px" }}
          disabled={
            email.trim() === "" ||
            password.trim() === "" ||
            name.trim() === "" ||
            cnfPassword.trim() === "" ||
            nameInvalid ||
            emailInvalid ||
            passwordInvalid ||
            cnfPwdInvalid
          }
          onClick={submitRegisterForm}
        >
          Register
        </CustomButton>
      </div>
      <div
        style={{ marginTop: "10px" }}
        className="alert alert-danger"
        hidden={!registerError}
      >
        {registerError?.message}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  register: (formData) => dispatch(registerUserAsync(formData)),
  toggleRegisterModal: () => dispatch(togglelRegisterModal()),
});

const mapStateToProps = (state, ownProps) => ({
  registerError: selectUserFetchError(state),
  handleSuccess: ownProps["handleSuccess"],
});

export const RegisterComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(_RegisterComponent);
