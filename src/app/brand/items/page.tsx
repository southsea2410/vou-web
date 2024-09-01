"use client";

import { DeleteIcon, Edit2Icon, Trash2, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import LabelledInput from "@/components/global/LabelledInput";
import LoadingBlock from "@/components/global/LoadingBlock";
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
import useDeleteItem from "@/services/brand/useDeleteItem";
import { DialogState, Item } from "@/services/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import BrandNavbar from "../_components/BrandNavbar";
import CreateItemDialog from "../_components/CreateItemDialog";
import S3Image from "@/components/global/S3Image";
import { useAuth } from "@/providers/ClientAuthProvider";
import useGetItems from "@/services/brand/useGetItems";
import useGetProfile from "@/services/brand/useGetProfile";
import useGetMyInfo from "@/services/identity/useGetMyInfo";
import useGetProfileByAccountId from "@/services/brand/useGetProfileByAccountId";

const itemColumnHelper = createColumnHelper<Item>();

export default function ItemsPage() {
  // const { data: profile } = useGetMyInfo();
  const { accountId } = useAuth();
  const { data: profile } = useGetProfileByAccountId(accountId, { enabled: !!accountId });

  const [editDialog, setEditDialog] = useState<DialogState<Item>>({ open: false });
  const [deleteDialog, setDeleteDialog] = useState<DialogState<Item>>({ open: false });

  const { data: items, isLoading } = useGetItems(profile?.id ?? "", { enabled: !!profile?.id });

  const itemColums = [
    itemColumnHelper.display({
      header: "Icon",
      size: 62,
      cell(props) {
        return (
          <S3Image
            k={props.row.original.icon}
            width={128}
            height={128}
            alt={props.row.original.name + " icon"}
          />
        );
      },
    }),
    itemColumnHelper.accessor("name", { header: "Name" }),
    itemColumnHelper.accessor("description", { header: "Description", size: 600 }),
    itemColumnHelper.display({
      header: "Actions",
      cell(props) {
        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditDialog({ open: true, item: props.row.original })}
            >
              <Edit2Icon />
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
  ] as ColumnDef<Item>[];

  // Edit logics
  const editForm = useForm<Item>({ defaultValues: editDialog.item });

  // Delete logics
  const { mutate: deleteItem } = useDeleteItem({
    onSuccess: () => {
      toast({
        title: "Item deleted",
        description: "The item has been deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting item",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    const item = deleteDialog.item;
    if (!item) return;
    deleteItem(item.id);
  };

  return (
    <main className="min-h-screen">
      <BrandNavbar />
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-2 text-3xl">Items Management</h1>
          <CreateItemDialog />
        </div>
        <Separator className="mb-5" />
        <div>
          {isLoading || !items ? (
            <LoadingBlock />
          ) : (
            <ReactTable columns={itemColums} data={items} />
          )}
        </div>
        {/* Edit Item Dialog */}
        <Dialog open={editDialog.open} onOpenChange={(s) => !s && setEditDialog({ open: s })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {editDialog.item?.name}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Form {...editForm}>
                <form>
                  <LabelledInput {...editForm.register("name")} label="Item name" />
                  <div>
                    <Label className="mb-1.5">Item description</Label>
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

        {/* Delete Item Dialog */}
        <Dialog open={deleteDialog.open} onOpenChange={(s) => !s && setDeleteDialog({ open: s })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete {deleteDialog.item?.name}?</DialogTitle>
              <DialogDescription>You will no longer see this item anymore!</DialogDescription>
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
