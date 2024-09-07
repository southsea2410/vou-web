import LabelledInput from "@/components/global/LabelledInput";
import S3Image from "@/components/global/S3Image";
import { Select } from "@/components/global/Select";
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
import { toast } from "@/components/ui/use-toast";
import useUpdateProfile, { UpdateProfileRequest } from "@/services/identity/useUpdateProfile";
import { DialogState, PlayerProfile } from "@/services/types";
import { useQueryClient } from "@tanstack/react-query";
import { ExternalLink, MapPin, UploadIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useForm, useFormState } from "react-hook-form";

export type UpdatePlayerForm = UpdateProfileRequest<PlayerProfile>["newProfile"] & {
  newImage: FileList;
};

type UpdatePlayerDialogProps = {
  item?: UpdatePlayerForm;
  open: boolean;
  setState: (state: DialogState<UpdatePlayerForm>) => void;
};

export default function UpdatePlayerDialog({
  item: player,
  open,
  setState,
}: UpdatePlayerDialogProps) {
  const handleClose = () => setState({ open: false });

  const editForm = useForm<UpdatePlayerForm>({ defaultValues: player });

  const formState = useFormState({ control: editForm.control });

  useEffect(() => {
    open && player && editForm.reset(player);
  }, [open, editForm, player]);

  const newImgFile = editForm.watch("newImage");
  const newImgUrl = useMemo(
    () => newImgFile && newImgFile.length && URL.createObjectURL(newImgFile[0]),
    [newImgFile],
  );

  const queryClient = useQueryClient();

  const { mutate: updateProfile } = useUpdateProfile({
    onSuccess(data, variables, context) {
      toast({
        title: "Player updated successfully",
      });

      setState({ open: false });
      queryClient.invalidateQueries({ queryKey: ["admin_all_accounts"] });
    },
    onError(err) {
      toast({ title: "Failed to update Player", description: err.message });
    },
  });

  const handleSubmitForm = async () => {
    const data = editForm.getValues();
    player?.id && updateProfile({ userId: player?.id, newProfile: data });
  };

  const selectOptions = ["male", "female", "other"].map((value) => ({ value, label: value }));

  return (
    <Dialog open={open} onOpenChange={(s) => !s && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Player</DialogTitle>
          <DialogDescription>{player?.fullName}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Form {...editForm}>
            <form className="flex h-full flex-col gap-2.5">
              <p className="font-medium text-primary">General information</p>
              <LabelledInput
                {...editForm.register("fullName", { required: true })}
                label="Full name"
              />
              <LabelledInput
                {...editForm.register("username", { required: true })}
                label="Username"
              />
              <LabelledInput {...editForm.register("email", { required: true })} label="Email" />
              <LabelledInput {...editForm.register("phone", { required: true })} label="Phone" />
              <p className="mt-2 font-medium text-primary">Player information</p>
              <div className="flex w-full gap-2">
                <label className="aspect-square rounded-full hover:cursor-pointer">
                  {newImgUrl ? (
                    <img src={newImgUrl} width={156} height={156} alt="Avatar" />
                  ) : (
                    !!player?.avatar && (
                      <S3Image k={player?.avatar} width={156} height={156} alt="Avatar" />
                    )
                  )}
                  <input
                    type="file"
                    {...editForm.register("newImage")}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
                <div className="flex grow flex-col gap-2">
                  <div>
                    <Label className="mb-1.5">Gender</Label>
                    <Select
                      onChange={(value) => editForm.setValue("gender", value)}
                      data={selectOptions}
                      defaultValue={player?.gender}
                    />
                  </div>
                  <LabelledInput
                    {...editForm.register("dateOfBirth", { required: true })}
                    label="Date of birth"
                    type="date"
                  />
                </div>
              </div>
              <LabelledInput
                {...editForm.register("turns", { required: true })}
                label="Game turns"
                type="number"
              />
              <div className="flex items-end gap-2">
                <LabelledInput
                  {...editForm.register("facebookAccount", { required: true })}
                  label="Facebook account"
                />
                <Button variant="ghost" asChild>
                  <Link
                    href={
                      player?.facebookAccount.includes("https://fb.com")
                        ? player?.facebookAccount
                        : "https://fb.com/" + player?.facebookAccount
                    }
                    target="_blank"
                  >
                    <span className="mr-2">
                      <ExternalLink />
                    </span>
                    Facebook
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmitForm} disabled={!formState.isDirty && !formState.isValid}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
