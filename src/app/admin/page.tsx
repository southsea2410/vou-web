import { Metadata } from "next";

import AdminNavbar from "./_components/AdminNavbar";
import MetabaseFrame from "./_components/MetabaseFrame";

export default function AdminHomepage() {
  return (
    <div className="h-screen p-4 flex flex-col">
      <AdminNavbar />
      <p className="text-3xl font-bold mb-5">Dashboard</p>
      <div className="relative flex-1">
        <MetabaseFrame />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "VOU Administator Portal",
  description: "Administator portal for VOU",
};
