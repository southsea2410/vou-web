import LabelledInput from "@/components/global/LabelledInput";
import S3Image from "@/components/global/S3Image";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useUpload } from "@/hooks/useUpload";
import useUpdateItem from "@/services/brand/useUpdateItem";
import { DialogState, Item } from "@/services/types";
import { useQueryClient } from "@tanstack/react-query";
import { UploadIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

type UpdateItemDialogProps = {
  item?: Item;
  open: boolean;
  setState: (state: DialogState<Item>) => void;
};

type ItemFormProps = Item & { newIcon: FileList };

export default function UpdateItemDialog({ item, open, setState }: UpdateItemDialogProps) {
  const handleClose = () => setState({ open: false });

  const editForm = useForm<ItemFormProps>({ defaultValues: item });

  useEffect(() => {
    open && item && editForm.reset(item);
  }, [open, editForm, item]);

  const newImgFile = editForm.watch("newIcon");
  const newImgUrl = useMemo(
    () => newImgFile && newImgFile.length && URL.createObjectURL(newImgFile[0]),
    [newImgFile],
  );

  const queryClient = useQueryClient();

  const { mutate: updateItem } = useUpdateItem({
    onSuccess(data, variables, context) {
      toast({
        title: "Item updated successfully",
      });

      setState({ open: false });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError(err) {
      toast({ title: "Failed to update item", description: err.message });
    },
  });

  const { upload } = useUpload();

  const handleUpload = () => {
    if (!newImgFile) {
      handleSubmitForm(item?.icon ?? "");
      return;
    }

    upload(newImgFile[0], (url) => handleSubmitForm(url));
  };

  const handleSubmitForm = async (newIcon: string) => {
    const data = editForm.getValues();

    data.newIcon = undefined as never;

    updateItem({ ...data, icon: newIcon });
  };

  return (
    <Dialog open={open} onOpenChange={(s) => !s && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>{item?.name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Form {...editForm}>
            <form>
              <div className="flex items-start gap-5">
                <div>
                  <Label>Item icon</Label>
                  <div className="relative aspect-square hover:cursor-pointer">
                    <label className="absolute size-full rounded-lg opacity-0 hover:bg-slate-950 hover:opacity-5">
                      <input
                        type="file"
                        {...editForm.register("newIcon", { required: true })}
                        className="hidden"
                      />
                    </label>
                    {newImgUrl ? (
                      <img src={newImgUrl} alt="icon" />
                    ) : (
                      !!item?.icon && <S3Image k={item.icon} alt="icon" width={120} height={120} />
                    )}
                  </div>
                </div>
                <div className="grow">
                  <LabelledInput
                    {...editForm.register("name", { required: true })}
                    label="Item name"
                    className="mb-2"
                  />
                  <div>
                    <Label className="mb-1.5">Item description</Label>
                    <Textarea {...editForm.register("description", { required: true })} />
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
