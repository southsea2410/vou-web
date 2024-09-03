import { useForm } from "react-hook-form";

import LabelledInput from "@/components/global/LabelledInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Item } from "@/services/types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import useCreateItem from "@/services/brand/useCreateItem";
import useGetProfileByAccountId from "@/services/brand/useGetProfileByAccountId";
import { useAuth } from "@/providers/ClientAuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useUpload } from "@/hooks/useUpload";

type CreateItemFormProps = Omit<Item, "icon"> & { icon: FileList };

export default function CreateItemDialog() {
  const queryClient = useQueryClient();

  const form = useForm<CreateItemFormProps>();

  const uploadedImage = form.watch("icon");

  const imgUri = useMemo(() => {
    if (!!uploadedImage) if (uploadedImage[0]) return URL.createObjectURL(uploadedImage[0]);
    return null;
  }, [uploadedImage]);

  const { upload } = useUpload();

  const [disabledSubmit, setDisableSubmit] = useState(false);

  const { mutate: createItem } = useCreateItem({
    onSuccess(data) {
      toast({
        title: "Item created successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError(err) {
      toast({ title: "Failed to create item", description: err.message });
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    form.trigger().then((isValid) => {
      if (!isValid) return;

      setDisableSubmit(true);

      upload(data.icon[0], handleSubmitForm);
    });
  });

  const { accountId } = useAuth();

  const { data: brandInfo, isSuccess: isBrandInfoSuccess } = useGetProfileByAccountId(accountId, {
    enabled: !!accountId,
  });

  useEffect(() => {
    if (isBrandInfoSuccess) {
      setDisableSubmit(false);

      form.setValue("brand_id", brandInfo?.id);
    } else setDisableSubmit(true);
  }, [brandInfo, form, isBrandInfoSuccess]);

  const handleSubmitForm = async (key: string) => {
    const data = form.getValues();
    const item = {
      ...data,
      icon: key,
    };

    setDisableSubmit(false);
    createItem(item);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form>
            <LabelledInput {...form.register("name")} label="Item name" />
            <div>
              <Label className="mb-1.5">Item description</Label>
              <Textarea {...form.register("description")} />
            </div>
            <LabelledInput
              {...form.register("icon", { required: true })}
              label="Item icon"
              type="file"
            />
            <div className="relative aspect-[2/1] w-full">
              {!!imgUri && <Image fill src={imgUri} alt="Voucher image" className="object-cover" />}
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={disabledSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
