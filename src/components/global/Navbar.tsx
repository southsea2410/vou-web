"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { title } from "process";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Placeholder from "@public/vou.png";

type Destination = LinkProps & { label: string };

type NavbarProps = {
  logo?: StaticImport;
  title: string;
  destinations: Destination[];
};

export default function Navbar({ logo, title, destinations }: NavbarProps) {
  const currentPath = usePathname();
  const current = destinations.findIndex((d) => {
    return currentPath === d.href;
  });

  return (
    <div className="flex h-[56px] w-fit items-center gap-5">
      <Image src={logo ?? Placeholder} alt="Website Logo" height={64} />
      <p className="text-2xl font-medium text-primary">{title}</p>
      <Breadcrumb>
        <BreadcrumbList className="gap-8">
          {destinations.map((d, i) => (
            <BreadcrumbItem key={d.label}>
              {current === i ? (
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
