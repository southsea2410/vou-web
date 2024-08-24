"use client";

import { useForm } from "react-hook-form";

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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Game, GameTypes, Voucher, VoucherUnitValue } from "@/services/types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Select } from "@/components/global/Select";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useUpload } from "@/hooks/useUpload";
import useCreateGame from "@/services/admin/useCreateGame";

type CreateGameFormProps = Omit<Game, "id" | "image"> & { image: FileList };

export default function CreateGameDialog() {
  const form = useForm<CreateGameFormProps>();

  const uploadedImage = form.watch("image");

  const imgUri = useMemo(() => {
    if (!!uploadedImage) if (uploadedImage[0]) return URL.createObjectURL(uploadedImage[0]);
    return null;
  }, [uploadedImage]);

  const { upload } = useUpload();

  const [disabledSubmit, setDisableSubmit] = useState(false);

  const { mutate: createGame } = useCreateGame({
    onSuccess(data) {
      toast({
        title: "Game created successfully",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    },
    onError(err) {
      toast({ title: "Failed to create game", description: err.message });
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    form.trigger().then((isValid) => {
      console.log(isValid);
      if (!isValid) return;
      setDisableSubmit(true);
      upload(data.image[0], handleSubmitForm);
    });
  });

  const handleSubmitForm = async (key: string) => {
    const data = form.getValues();
    const game = {
      ...data,
      image: key,
    };

    setDisableSubmit(false);
    createGame(game);
  };

  const gameTypeSelct = GameTypes.map((i) => {
    return { value: i, label: i };
  });

  const handleChangeUnitValue = (value: string) => {
    form.setValue("type", value as never);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Game</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create Game</DialogTitle>
          <DialogDescription>Create a game mobile players</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex h-full flex-col gap-2">
            <LabelledInput {...form.register("name", { required: true })} label="Game name" />
            <LabelledInput
              {...form.register("image", { required: true })}
              label="Image"
              type="file"
            />
            <div className="relative aspect-[2/1] w-full">
              {!!imgUri && <Image fill src={imgUri} alt="Voucher image" className="object-cover" />}
            </div>
            <div>
              <Label className="mb-1.5">Item description</Label>
              <Textarea {...form.register("instruction", { required: true })} />
            </div>
            <div>
              <Label className="mb-1.5">Game type</Label>
              <Select
                data={gameTypeSelct}
                placeholder="Select..."
                onChange={handleChangeUnitValue}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={disabledSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
