"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Placeholder from "@public/next.svg";

type Destination = LinkProps & { label: string };

type NavbarProps = {
  logo?: StaticImport;
  destinations: Destination[];
};

export default function Navbar({ logo, destinations }: NavbarProps) {
  const currentPath = usePathname();
  const current = destinations.findIndex((d) => (d.href as string).search(currentPath) !== -1);
  return (
    <div className="flex items-center gap-5 h-[56px] w-fit">
      <Image src={logo ?? Placeholder} alt="Website Logo" height={24} />
      <Breadcrumb>
        <BreadcrumbList className="gap-8">
          {destinations.map((d, i) => (
            <BreadcrumbItem>
              {!!current && current === i ? (
                <BreadcrumbPage>{d.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={d.href}>{d.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export type { Destination, NavbarProps };
