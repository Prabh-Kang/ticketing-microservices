import type { NextPage, NextPageContext } from "next";
import buildClient from "../api/buildClient";

interface User {
  email: string;
  id: string;
}
interface Props {
  currentUser?: null | User;
}

const Home: NextPage<Props> = ({ currentUser }) => {
  return <div>{currentUser ? "You are signed in" : "You are signed out"}</div>;
};

Home.getInitialProps = async (context: NextPageContext) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default Home;
