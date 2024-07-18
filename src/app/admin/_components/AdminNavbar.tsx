import Navbar, { Destination } from "@/components/global/Navbar";

const destinations: Destination[] = [
  {
    href: "/admin/events",
    label: "Sự kiện",
  },
  {
    href: "/admin/accounts",
    label: "Tài khoản",
  },
  {
    href: "/admin/brands",
    label: "Thương hiệu",
  },
];

export default function AdminNavbar() {
  return <Navbar destinations={destinations} />;
}
