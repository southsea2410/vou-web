"use client";

import ReactTable from "@/components/global/ReactTable";
import BrandNavbar from "../_components/BrandNavbar";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Voucher, VoucherUnitValue } from "@/services/types";
import useGetVouchers from "@/services/brand/useGetVouchers";
import { Separator } from "@/components/ui/separator";
import CreateVoucherDialog from "../_components/CreateVoucherDialog";

const voucherColumnHelper = createColumnHelper<Voucher>();

const voucherColumns = [
  voucherColumnHelper.display({
    header: "#",
    cell(props) {
      return <span>{props.row.index + 1}</span>;
    },
    minSize: 50,
  }),
  voucherColumnHelper.accessor("value", {
    header: "Value",
  }),
  voucherColumnHelper.accessor("unitValue", {
    header: "Unit Value",
    filterFn: "arrIncludesSome",
  }),
  voucherColumnHelper.accessor("description", { header: "Description", minSize: 450 }),
  voucherColumnHelper.accessor("status", {
    // cell(props) {
    //   return <span>{props.getValue() === 1 ? "Active" : "Inactive"}</span>;
    // },
  }),
  voucherColumnHelper.accessor("voucherCode", { header: "Voucher Code" }),
  voucherColumnHelper.accessor("qrCode", { header: "QR Code" }),
] as ColumnDef<Voucher>[];

export default function VouchersPage() {
  const { data: vouchers } = useGetVouchers();

  return (
    <main>
      <BrandNavbar />
      <div className="w-104 container overflow-auto py-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-2 text-3xl">Vouchers Management</h1>
          <CreateVoucherDialog />
        </div>
        <Separator className="mb-5" />
        <ReactTable
          columns={voucherColumns}
          filterOptions={{
            unitValue: Array.from(VoucherUnitValue),
          }}
          data={vouchers}
        />
      </div>
    </main>
  );
}
