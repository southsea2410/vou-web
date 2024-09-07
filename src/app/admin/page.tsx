import AdminNavbar from "./_components/AdminNavbar";
import MetabaseFrame from "./_components/MetabaseFrame";

export default function AdminHomepage() {
  return (
    <div className="flex h-screen flex-col">
      <AdminNavbar />
      <div className="relative mt-10 h-[90vh]">
        <MetabaseFrame
          payload={{
            resource: { dashboard: 4 },
            params: {},
          }}
        />
      </div>
    </div>
  );
}
