import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { useSignUpMutation } from "../../redux/apis/auth/auth-api-slice";
import Router from "next/router";
import { useAppDispatch } from "../../hooks/redux";
import { setUser } from "../../redux/features/userSlice";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUp, { isSuccess, data }] = useSignUpMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
      Router.push("/");
    }
  }, [isSuccess]);

  const invalidFeedBack = (feedback: string) => {
    return <div className="invalid-feedback">{feedback}</div>;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp({
      email,
      password,
    });
  };

  return (
    <div className="container m-4 p-2 d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="w-75">
        <fieldset>
          <legend>Sign Up</legend>
          <div className="form-group mb-2">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
          </div>

          <div className="form-group mb-2">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classnames("form-control", {
                "is-invalid": password !== confirmPassword,
              })}
              autoComplete="off"
            />
            {invalidFeedBack("Passwords do not match")}
          </div>

          <div className="form-group mb-2">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={classnames("form-control", {
                "is-invalid": password !== confirmPassword,
              })}
              autoComplete="off"
            />
            {invalidFeedBack("Passwords do not match")}
          </div>
          <div className="mb-2">
            <button
              className="btn btn-primary btn-block"
              disabled={password !== confirmPassword}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Signup;
