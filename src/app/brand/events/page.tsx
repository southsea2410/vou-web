"use client";

import ReactTable from "@/components/global/ReactTable";
import { Separator } from "@/components/ui/separator";
import { DialogState, Event } from "@/services/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import BrandNavbar from "../_components/BrandNavbar";
import S3Image from "@/components/global/S3Image";
import LoadingBlock from "@/components/global/LoadingBlock";
import { useAuth } from "@/providers/ClientAuthProvider";
import useGetProfileByAccountId from "@/services/brand/useGetProfileByAccountId";
import useGetEvents from "@/services/brand/useGetEvents";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UpdateEventDialog, { UpdateEventForm } from "../_components/UpdateEventDialog";
import { Edit2 } from "lucide-react";

const eventColumnHelper = createColumnHelper<Event>();

export default function Eventspage() {
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
      enableColumnFilter: false,
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
    eventColumnHelper.display({
      header: "Actions",
      cell(props) {
        return (
          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              setEditEventDialog({ open: true, item: props.row.original as UpdateEventForm })
            }
          >
            <Edit2 />
          </Button>
        );
      },
    }),
  ] as ColumnDef<Event>[];
  const { accountId } = useAuth();
  const { data: profile } = useGetProfileByAccountId(accountId, { enabled: !!accountId });

  const { data: events } = useGetEvents(profile?.id ?? "", { enabled: !!profile?.id });

  const [editEventDialog, setEditEventDialog] = useState<DialogState<UpdateEventForm>>({
    open: false,
  });

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
        <UpdateEventDialog {...editEventDialog} setState={setEditEventDialog} />
      </div>
    </div>
  );
}
