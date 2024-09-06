"use client";

import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ReactTable from "@/components/global/ReactTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import useDeleteVoucher from "@/services/brand/useDeleteVoucher";
import { DialogState, Voucher, VoucherUnitValue } from "@/services/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import BrandNavbar from "../_components/BrandNavbar";
import CreateVoucherDialog from "../_components/CreateVoucherDialog";
import LoadingBlock from "@/components/global/LoadingBlock";
import { useQueryClient } from "@tanstack/react-query";
import useGetVouchers from "@/services/brand/useGetVouchers";
import useGetProfileByAccountId from "@/services/brand/useGetProfileByAccountId";
import { useAuth } from "@/providers/ClientAuthProvider";
import S3Image from "@/components/global/S3Image";
import UpdateVoucherDialog from "../_components/UpdateVoucherDialog";

const voucherColumnHelper = createColumnHelper<Voucher>();

export default function VouchersPage() {
  const { accountId } = useAuth();
  const { data: profile } = useGetProfileByAccountId(accountId, { enabled: !!accountId });
  const { data: vouchers } = useGetVouchers(profile?.id ?? "", { enabled: !!profile?.id });

  const [editDialog, setEditDialog] = useState<DialogState<Voucher>>({ open: false });
  const [deleteDialog, setDeleteDialog] = useState<DialogState<Voucher>>({ open: false });

  const voucherColumns = [
    voucherColumnHelper.accessor("voucherCode", { header: "Voucher Code" }),
    voucherColumnHelper.accessor("qrCode", {
      header: "QR Code",
      cell(props) {
        return <S3Image k={props.getValue()} alt={props.getValue()} />;
      },
      maxSize: 140,
    }),
    voucherColumnHelper.accessor("image", {
      header: "Image",
      minSize: 260,
      cell(props) {
        return <S3Image k={props.getValue()} alt="Voucher Image" />;
      },
    }),
    voucherColumnHelper.accessor("value", {
      header: "Value",
    }),
    voucherColumnHelper.accessor("description", { header: "Description" }),
    voucherColumnHelper.accessor("status", {
      header: "Status",
      cell(props) {
        return <span>{props.getValue() === 1 ? "Active" : "Inactive"}</span>;
      },
    }),
    voucherColumnHelper.display({
      header: "Actions",
      cell(props) {
        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditDialog({ open: true, item: props.row.original })}
            >
              <Edit2 />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setDeleteDialog({ open: true, item: props.row.original })}
            >
              <Trash2 />
            </Button>
          </div>
        );
      },
    }),
  ] as ColumnDef<Voucher>[];

  const queryClient = useQueryClient();

  // Delete logics
  const { mutate: deleteVoucher } = useDeleteVoucher({
    onSuccess: () => {
      toast({
        title: "Voucher deleted",
        description: "Voucher has been deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
    },
    onError: (error) => {
      toast({
        title: "Error deleting Voucher",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    const voucher = deleteDialog.item;
    if (!voucher) return;
    deleteVoucher(voucher.id);
  };

  return (
    <main>
      <BrandNavbar />
      <div className="w-104 container overflow-auto py-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-2 text-3xl">Vouchers Management</h1>
          <CreateVoucherDialog />
        </div>
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
        {/* Update Voucher Dialog */}
        <UpdateVoucherDialog {...editDialog} setState={setEditDialog} />

        {/* Delete Voucher Dialog */}
        <Dialog open={deleteDialog.open} onOpenChange={(s) => !s && setDeleteDialog({ open: s })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Voucher?</DialogTitle>
              <DialogDescription>
                {deleteDialog.item?.voucherCode || deleteDialog.item?.qrCode}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setDeleteDialog({ open: false })}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
