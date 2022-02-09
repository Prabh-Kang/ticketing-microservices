import Link from "next/link";

interface Props {
  href: string;
  title: string;
}

const LinkButton: React.FC<Props> = ({ href, title }) => {
  return (
    <li className="nav-item">
      <Link href={href}>
        <a className="nav-link">{title}</a>
      </Link>
    </li>
  );
};

export default LinkButton;
