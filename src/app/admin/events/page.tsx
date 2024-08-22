"use client";

import ReactTable from "@/components/global/ReactTable";
import { Separator } from "@/components/ui/separator";
import { mockEvents } from "@/services/mocks/mockEvents";
import { Event } from "@/services/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import AdminNavbar from "../_components/AdminNavbar";

const eventColumnHelper = createColumnHelper<Event>();

const eventColumns = [
  eventColumnHelper.accessor("name", {
    header: "Name",
  }),
  eventColumnHelper.accessor("image", {
    header: "Image",
    cell(props) {
      return (
        <img
          src={props.row.original.image}
          width={300}
          height={150}
          alt={props.row.original.name + " image"}
        />
      );
    },
    size: 300,
  }),
  eventColumnHelper.accessor("numberOfVoucher", {
    header: "Number of Voucher",
    size: 200,
  }),
  eventColumnHelper.accessor("startDate", {
    header: "Start Date",
    size: 200,
  }),
  eventColumnHelper.accessor("endDate", {
    header: "End Date",
    size: 200,
  }),
] as ColumnDef<Event>[];

export default async function BrandHomepage() {
  return (
    <div className="min-h-screen">
      <AdminNavbar />
      <div className="container py-4">
        <h1 className="mb-2 text-3xl">Events Management</h1>
        <Separator className="mb-5" />
        <div>
          <ReactTable columns={eventColumns} data={mockEvents} filterOptions={{}} />
        </div>
      </div>
    </div>
  );
}
