import React, { useEffect, useState } from "react";
import classnames from "classnames";
import Router from "next/router";
import { useSignInMutation } from "../../redux/apis/auth/auth-api-slice";
import { useAppDispatch } from "../../hooks/redux";
import { setUser } from "../../redux/features/userSlice";

const SignIn: React.FC = () => {
  const [signIn, { isError, isSuccess, isUninitialized, data }] =
    useSignInMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
      Router.push("/");
    }
  }, [isSuccess]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({
      email,
      password,
    });
  };

  return (
    <div className="container m-4 p-2 d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="w-75">
        <fieldset>
          <legend>Sign In</legend>
          <div className="form-group mb-2">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classnames("form-control")}
              autoComplete="off"
            />
          </div>

          <div className="form-group mb-2">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classnames("form-control")}
              autoComplete="off"
            />
          </div>

          <div className="mb-2">
            <button className="btn btn-primary btn-block">Submit</button>
          </div>

          {isError && !isUninitialized && (
            <div className="alert alert-danger w-100">Invalid credentials</div>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default SignIn;
