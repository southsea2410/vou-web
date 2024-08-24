"use client";

import { Edit2, Trash2, UploadIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import DatePickerForm from "@/components/global/DatePickerForm";
import LabelledInput from "@/components/global/LabelledInput";
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
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import useDeleteVoucher from "@/services/brand/useDeleteVoucher";
import useGetAllVouchers from "@/services/admin/useGetAllVouchers";
import { DialogState, Voucher, VoucherUnitValue } from "@/services/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import BrandNavbar from "../_components/BrandNavbar";
import CreateVoucherDialog from "../_components/CreateVoucherDialog";
import LoadingBlock from "@/components/global/LoadingBlock";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/ClientAuthProvider";
import useGetProfileByAccountId from "@/services/brand/useGetProfileByAccountId";

const voucherColumnHelper = createColumnHelper<Voucher>();

export default function VouchersPage() {
  const { accountId } = useAuth();

  const { data: vouchers } = useGetAllVouchers();

  const filteredVouchers = useMemo(
    () => vouchers?.filter((v) => (v as any).brand?.accountId === accountId),
    [vouchers, accountId],
  );

  const [editDialog, setEditDialog] = useState<DialogState<Voucher>>({ open: false });
  const [deleteDialog, setDeleteDialog] = useState<DialogState<Voucher>>({ open: false });

  const voucherColumns = [
    voucherColumnHelper.accessor("value", {
      header: "Value",
    }),
    voucherColumnHelper.accessor("description", { header: "Description", minSize: 450 }),
    voucherColumnHelper.accessor("status", {
      cell(props) {
        return <span>{props.getValue() === 1 ? "Active" : "Inactive"}</span>;
      },
    }),
    voucherColumnHelper.accessor("voucherCode", { header: "Voucher Code" }),
    voucherColumnHelper.accessor("qrCode", { header: "QR Code" }),
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

  // Edit logics
  const editForm = useForm<Voucher>({ defaultValues: editDialog.item });

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
        {filteredVouchers ? (
          <ReactTable
            columns={voucherColumns}
            filterOptions={{
              unitValue: Array.from(VoucherUnitValue),
            }}
            data={filteredVouchers}
          />
        ) : (
          <LoadingBlock />
        )}
        {/* Edit Voucher Dialog */}
        <Dialog open={editDialog.open} onOpenChange={(s) => !s && setEditDialog({ open: s })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Voucher</DialogTitle>
              <DialogDescription>
                {editDialog.item?.voucherCode || editDialog.item?.qrCode}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Form {...editForm}>
                <form>
                  <LabelledInput {...editForm.register("voucherCode")} label="Voucher Code" />
                  <LabelledInput {...editForm.register("voucherCode")} label="QR Code" />
                  <LabelledInput
                    {...editForm.register("value", { required: true })}
                    type="number"
                    label="Value"
                  />
                  <DatePickerForm form={editForm} name="expiredDate" label="Expired Date" />
                  <div>
                    <Label className="mb-1.5">Voucher description</Label>
                    <Textarea {...editForm.register("description")} />
                  </div>
                </form>
              </Form>
              <Label>Icon</Label>
              <Button size="icon">
                <UploadIcon />
              </Button>
            </div>
            <DialogFooter>
              <Button variant="ghost">Cancel</Button>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
