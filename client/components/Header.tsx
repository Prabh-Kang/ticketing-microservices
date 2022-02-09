import Link from "next/link";
import LinkButton from "./LinkButton";

interface CurrentUser {
  email: string;
  id: string;
}

interface Props {
  currentUser?: CurrentUser;
}

const Header: React.FC<Props> = ({ currentUser }) => {
  return (
    <nav className="nav navbar-light bg-light justify-content-between py-2 px-4">
      <Link href="/">
        <a className="navbar-brand">GetTix</a>
      </Link>
      <ul className="nav align-items-center">
        {currentUser ? (
          <LinkButton href="/auth/signout" title="Sign Out" />
        ) : (
          <>
            <LinkButton href="/auth/signin" title="Sign In" />
            <LinkButton href="/auth/signup" title="Sign Up" />
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
