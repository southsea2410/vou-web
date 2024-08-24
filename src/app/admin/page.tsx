import { Metadata } from "next";

import AdminNavbar from "./_components/AdminNavbar";
import MetabaseFrame from "./_components/MetabaseFrame";

export default function AdminHomepage() {
  return (
    <div className="flex h-screen flex-col">
      <AdminNavbar />
      <div className="flex-1 p-4">
        <p className="mb-5 text-2xl font-medium">Analytics dashboard</p>
        <div className="relative h-full">
          <MetabaseFrame dashboardId={3} />
        </div>
      </div>
    </div>
  );
}
