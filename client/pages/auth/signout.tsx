import { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useSignOutMutation } from "../../redux/apis/auth/auth-api-slice";
import { removeUser } from "../../redux/features/userSlice";

const Signout: NextPage = () => {
  const dispatch = useAppDispatch();
  const [signOut, { isSuccess }] = useSignOutMutation();
  useEffect(() => {
    signOut({});
    dispatch(removeUser());
  }, []);

  useEffect(() => {
    Router.push("/");
  }, [isSuccess]);
  return <h4>You are being signed out...</h4>;
};

export default Signout;
