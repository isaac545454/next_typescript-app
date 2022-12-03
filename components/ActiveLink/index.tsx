import Link, { LinkProps } from "next/link";
import { ReactElement, cloneElement } from "react";
import { useRouter } from "next/router";

interface Props extends LinkProps {
  activeClassName: string;
  children: ReactElement;
}

export const ActiveLink = ({ children, activeClassName, ...res }: Props) => {
  const { asPath } = useRouter();
  // console.log(asPath, res.href);

  const className = asPath === res.href ? "text-yellow-primary" : "";

  console.log(className);

  return (
    <Link {...res}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
};
