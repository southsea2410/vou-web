import BrandNavbar from "../_components/BrandNavbar";
import { columns, Payment } from "./_columns";
import { DataTable } from "./_data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

export default async function BrandHomepage() {
  const data = await getData();
  return (
    <div className="min-h-screen">
      <BrandNavbar />
      <div className="h-full bg-background">
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
