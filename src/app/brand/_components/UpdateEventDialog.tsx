import { DialogState, Event } from "@/services/types";
import LabelledInput from "@/components/global/LabelledInput";
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
import { toast } from "@/components/ui/use-toast";
import { getLocation } from "@/lib/utils";
import useUpdateProfile, { UpdateProfileRequest } from "@/services/identity/useUpdateProfile";
import { useQueryClient } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm, useFormState } from "react-hook-form";
import S3Image from "@/components/global/S3Image";
import DatePickerForm from "@/components/global/DatePickerForm";
import { Label } from "@/components/ui/label";
import { useUpload } from "@/hooks/useUpload";
import useUpdateEvent from "@/services/brand/useUpdateEvent";

export type UpdateEventForm = Event & { newImage: FileList };

type UpdateEventDialogProps = DialogState<UpdateEventForm> & {
  setState: (state: DialogState<UpdateEventForm>) => void;
};

export default function UpdateEventDialog({ item, open, setState }: UpdateEventDialogProps) {
  const handleClose = () => setState({ open: false });

  const editForm = useForm<UpdateEventForm>({ defaultValues: item });

  useEffect(() => {
    open && item && editForm.reset(item);
  }, [open, editForm, item]);

  const newImgFile = editForm.watch("newImage");
  const newImgUrl = useMemo(
    () => newImgFile && newImgFile.length && URL.createObjectURL(newImgFile[0]),
    [newImgFile],
  );

  const queryClient = useQueryClient();

  const { mutate: updateEvent } = useUpdateEvent({
    onSuccess(data, variables, context) {
      toast({
        title: "Event updated successfully",
      });

      setState({ open: false });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError(err) {
      toast({ title: "Failed to update event", description: err.message, variant: "destructive" });
    },
  });

  const { upload } = useUpload();

  const handleUpload = () => {
    if (!newImgFile) {
      handleSubmitForm(item?.image ?? "");
      return;
    }

    upload(newImgFile[0], (url) => handleSubmitForm(url));
  };

  const handleSubmitForm = async (newImage: string) => {
    const data = editForm.getValues();

    data.newImage = undefined as never;

    updateEvent({ ...data, image: newImage });
  };

  return (
    <Dialog open={open} onOpenChange={(s) => !s && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>Event {item?.name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Form {...editForm}>
            <form className="flex h-full flex-col gap-2">
              <LabelledInput
                {...editForm.register("name", { required: true })}
                label="Event name"
              />
              <LabelledInput
                {...editForm.register("newImage", { required: true })}
                label="Event Image"
                type="file"
              />
              <div className="relative aspect-[2/1] w-full">
                {newImgUrl ? (
                  <img src={newImgUrl} alt="icon" />
                ) : (
                  !!item?.image && <S3Image k={item.image} alt="icon" width={460} height={230} />
                )}
              </div>
              <div>
                <Label className="mb-1.5">Event start date</Label>
                <DatePickerForm form={editForm} name={"startDate"} required />
              </div>
              <div>
                <Label className="mb-1.5">Event end date</Label>
                <DatePickerForm form={editForm} name={"endDate"} required />
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
