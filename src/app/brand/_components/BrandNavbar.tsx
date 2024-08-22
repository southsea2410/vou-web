import Image from "next/image";
import Link from "next/link";

import Navbar, { Destination } from "@/components/global/Navbar";
import { Button } from "@/components/ui/button";

const destinations: Destination[] = [
  {
    href: "/brand",
    label: "General",
  },
  {
    href: "/brand/vouchers",
    label: "Vouchers",
  },
  {
    href: "/brand/items",
    label: "Items",
  },
  {
    href: "/brand/events",
    label: "Events",
  },
];

export default function BrandNavbar() {
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 px-4">
      <Navbar title="Brands - Mangement center" destinations={destinations} />
      <Button asChild>
        <Link href="/brand/create-event">Create event</Link>
      </Button>
      <Button
        asChild
        size="icon"
        className="ml-auto rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Link href="/brand/profile">
          <Image
            src="https://avatar.iran.liara.run/public"
            alt="User Avatar"
            width={56}
            height={56}
            className="rounded-full"
          />
        </Link>
      </Button>
    </div>
  );
}
