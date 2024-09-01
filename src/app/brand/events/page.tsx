"use client";

import ReactTable from "@/components/global/ReactTable";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/services/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import BrandNavbar from "../_components/BrandNavbar";
import S3Image from "@/components/global/S3Image";
import LoadingBlock from "@/components/global/LoadingBlock";
import { useAuth } from "@/providers/ClientAuthProvider";
import useGetProfileByAccountId from "@/services/brand/useGetProfileByAccountId";
import useGetEvents from "@/services/brand/useGetEvents";
import useGetMyInfo from "@/services/identity/useGetMyInfo";

const eventColumnHelper = createColumnHelper<Event>();

const eventColumns = [
  eventColumnHelper.accessor("name", {
    header: "Name",
  }),
  eventColumnHelper.accessor("image", {
    header: "Image",
    cell(props) {
      return (
        <S3Image
          k={props.row.original.image}
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

export default function Eventspage() {
  const { data: profile } = useGetMyInfo();

  const { data: events } = useGetEvents(profile?.id ?? "", { enabled: !!profile?.id });

  const { accountId } = useAuth();

  const { data: brandInfo } = useGetProfileByAccountId(accountId);

  console.log(brandInfo);

  return (
    <div className="min-h-screen">
      <BrandNavbar />
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-2 text-3xl">Events Management</h1>
        </div>
        <Separator className="mb-5" />
        <div>
          {events ? (
            <ReactTable columns={eventColumns} data={events} filterOptions={{}} />
          ) : (
            <LoadingBlock />
          )}
        </div>
      </div>
    </div>
  );
}
