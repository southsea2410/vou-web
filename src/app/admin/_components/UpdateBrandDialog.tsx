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
import useUpdateProfile, { UpdateProfileRequest } from "@/services/identity/useUpdateProfile";
import { BrandProfile, DialogState } from "@/services/types";
import { useQueryClient } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";

type UpdateBrandForm = UpdateProfileRequest<BrandProfile>["newProfile"];

type UpdateBrandDialogProps = {
  item?: UpdateBrandForm;
  open: boolean;
  setState: (state: DialogState<UpdateBrandForm>) => void;
};

function getLocation(callback: PositionCallback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
    toast({ title: "Get current location successfully" });
  } else {
    toast({ title: "Geolocation is not supported by this browser.", variant: "destructive" });
  }
}

export default function UpdateBrandDialog({ item: brand, open, setState }: UpdateBrandDialogProps) {
  const handleClose = () => setState({ open: false });

  const editForm = useForm<UpdateBrandForm>({ defaultValues: brand });

  const formState = useFormState({ control: editForm.control });

  useEffect(() => {
    open && brand && editForm.reset(brand);
  }, [open, editForm, brand]);

  const queryClient = useQueryClient();

  const { mutate: updateProfile } = useUpdateProfile({
    onSuccess(data, variables, context) {
      toast({
        title: "Brand updated successfully",
      });

      setState({ open: false });
      queryClient.invalidateQueries({ queryKey: ["admin_all_accounts"] });
    },
    onError(err) {
      toast({ title: "Failed to update Brand", description: err.message });
    },
  });

  const handleSubmitForm = async () => {
    const data = editForm.getValues();
    brand?.id && updateProfile({ userId: brand?.id, newProfile: data });
  };

  const handleGetCurrentLocation = () => {
    getLocation((position) => {
      editForm.setValue("latitude", position.coords.latitude);
      editForm.setValue("longitude", position.coords.longitude);
    });
  };

  return (
    <Dialog open={open} onOpenChange={(s) => !s && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Brand</DialogTitle>
          <DialogDescription>{brand?.fullName}</DialogDescription>
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
              <p className="mt-2 font-medium text-primary">Brand information</p>
              <LabelledInput
                {...editForm.register("brandName", { required: true })}
                label="Brand name"
              />
              <LabelledInput {...editForm.register("field", { required: true })} label="Field" />
              <div className="flex items-end gap-2">
                <LabelledInput
                  {...editForm.register("latitude", { required: true })}
                  type="number"
                  label="Latitude"
                />
                <LabelledInput
                  {...editForm.register("longitude", { required: true })}
                  type="number"
                  label="Longitude"
                />
                <Button variant="ghost" type="button" onClick={handleGetCurrentLocation}>
                  <span>
                    <MapPin className="mr-2" />
                  </span>
                  Current location
                </Button>
              </div>
              <LabelledInput
                {...editForm.register("address", { required: true })}
                label="Address"
              />
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
