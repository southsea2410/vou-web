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
    label: "Sự kiện",
  },
  {
    href: "/brand/items",
    label: "Vật phẩm",
  },
];

export default function BrandNavbar() {
  return (
    <div className="flex items-center gap-4 border-b border-gray-100">
      <Navbar destinations={destinations} />
      <Button asChild>
        <Link href="/brand/create-event">Tạo sự kiện</Link>
      </Button>
    </div>
  );
}
