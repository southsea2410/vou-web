import MetabaseFrame from "../admin/_components/MetabaseFrame";
import BrandNavbar from "./_components/BrandNavbar";

export default function BrandHomepage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BrandNavbar />
      <div className="relative mt-10 h-[85vh] p-4">
        <MetabaseFrame dashboardId={5} />
      </div>
    </div>
  );
}
