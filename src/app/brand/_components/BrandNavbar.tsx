import Link from "next/link";

import Navbar, { Destination } from "@/components/global/Navbar";
import { Button } from "@/components/ui/button";

const destinations: Destination[] = [
  {
    href: "/brand",
    label: "Tổng quan",
  },
  {
    href: "/brand/events",
    label: "Events",
  },
  {
    href: "/brand/vouchers",
    label: "Vouchers",
  },
  {
    href: "/brand/items",
    label: "Items",
  },
];

export default function BrandNavbar() {
  return (
    <div className="flex items-center gap-4 border-b border-gray-100">
      <Navbar title="Brands - Admin center" destinations={destinations} />
      <Button asChild>
        <Link href="/brand/create-event">Create event</Link>
      </Button>
    </div>
  );
}
