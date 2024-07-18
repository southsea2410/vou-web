import { buttonVariants } from "@/components/ui/button";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

type LinkProps = {
  children: React.ReactNode;
  className?: string;
} & NextLinkProps;

function Link({ children, className, href }: LinkProps) {
  return (
    <NextLink className={buttonVariants({ variant: "outline" })} href={href}>
      {children}
    </NextLink>
  );
}
