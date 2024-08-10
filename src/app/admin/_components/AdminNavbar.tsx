import Navbar, { Destination } from "@/components/global/Navbar";

const destinations: Destination[] = [
  {
    href: "/admin",
    label: "General",
  },
  {
    href: "/admin/events",
    label: "Events",
  },
  {
    href: "/admin/accounts",
    label: "Accounts",
  },
  {
    href: "/admin/brands",
    label: "Brands",
  },
];

export default function AdminNavbar() {
  return <Navbar title="Admin - Management center" destinations={destinations} />;
}
