"use client";

import ReactTable from "@/components/global/ReactTable";
import { Separator } from "@/components/ui/separator";
import useGetAllVouchers from "@/services/admin/useGetAllVouchers";
import { Voucher, VoucherUnitValue } from "@/services/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import AdminNavbar from "../_components/AdminNavbar";
import LoadingBlock from "@/components/global/LoadingBlock";

const voucherColumnHelper = createColumnHelper<Voucher>();

export default function VouchersPage() {
  const { data: vouchers } = useGetAllVouchers();

  const voucherColumns = [
    voucherColumnHelper.accessor("value", {
      header: "Value",
    }),
    voucherColumnHelper.accessor("unitValue", {
      header: "Unit Value",
      filterFn: "arrIncludesSome",
    }),
    voucherColumnHelper.accessor("description", { header: "Description", minSize: 450 }),
    voucherColumnHelper.accessor("status", {
      cell(props) {
        return <span>{props.getValue() === 1 ? "Active" : "Inactive"}</span>;
      },
    }),
    voucherColumnHelper.accessor("voucherCode", { header: "Voucher Code" }),
    voucherColumnHelper.accessor("qrCode", { header: "QR Code" }),
  ] as ColumnDef<Voucher>[];

  return (
    <main>
      <AdminNavbar />
      <div className="w-104 container overflow-auto py-4">
        <h1 className="mb-2 text-3xl">Vouchers Management</h1>
        <Separator className="mb-5" />
        {vouchers ? (
          <ReactTable
            columns={voucherColumns}
            filterOptions={{
              unitValue: Array.from(VoucherUnitValue),
            }}
            data={vouchers}
          />
        ) : (
          <LoadingBlock />
        )}
      </div>
    </main>
  );
}
