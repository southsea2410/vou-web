"use client";

import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import LabelledInput from "@/components/global/LabelledInput";
import LoadingBlock from "@/components/global/LoadingBlock";
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
import useGetItems from "@/services/brand/useGetItems";
import { Item } from "@/services/types";

import BrandNavbar from "../_components/BrandNavbar";
import CreateItemDialog from "../_components/CreateItemDialog";
import ItemFrame from "../_components/ItemFrame";
import mockItems from "./mockitem.json";

export type DialogState = {
  open: boolean;
  item?: Item;
};

export default function ItemsPage() {
  const { data: items, isLoading } = useGetItems({
    initialData: mockItems,
  });

  const [editDialog, setEditDialog] = useState<DialogState>({ open: false });
  const [deleteDialog, setDeleteDialog] = useState<DialogState>({ open: false });

  // Edit logics
  const editForm = useForm<Item>();

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
    deleteItem({ id: item.id });
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
        <div className="flex flex-wrap gap-2 py-4">
          {isLoading ? (
            <LoadingBlock />
          ) : (
            items?.map((item) => (
              <div key={item.id}>
                <ItemFrame
                  item={item}
                  setDeleteDialog={setDeleteDialog}
                  setEditDialog={setEditDialog}
                />
              </div>
            ))
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
