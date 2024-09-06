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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { DialogState, Game, GameTypes } from "@/services/types";
import { Select } from "@/components/global/Select";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useUpload } from "@/hooks/useUpload";
import useUpdateGame from "@/services/admin/useUpdateGame";
import useGetObjectUrl from "@/hooks/useGetObjectUrl";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type UpdatedGameFormProps = Game & { id: string };

type UpdateGameDialogProps = {
  game: Game;
  open: boolean;
  setState: (state: DialogState<Game>) => void;
};

export default function UpdateGameDialog({
  game: defaultGame,
  open,
  setState,
}: UpdateGameDialogProps) {
  const form = useForm<UpdatedGameFormProps>({ defaultValues: defaultGame });

  useEffect(() => {
    open && form.reset(defaultGame);
  }, [form, open, defaultGame]);

  const [previewImgUri, setImgUri] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

  const { data: oldImgUrl, isSuccess } = useGetObjectUrl(defaultGame.image);

  useEffect(() => {
    if (isSuccess) {
      setImgUri(oldImgUrl);
    }
  }, [oldImgUrl, setImgUri, isSuccess]);

  const { upload } = useUpload();

  const [disabledSubmit, setDisableSubmit] = useState(false);

  const { mutate: updateGame } = useUpdateGame({
    onSuccess(data) {
      toast({
        title: "Game updated successfully",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    },
    onError(err) {
      toast({ title: "Failed to update game", description: err.message });
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    form.trigger().then((isValid) => {
      if (!isValid) return;

      setDisableSubmit(true);

      if (newImage) upload(newImage, handleSubmitForm);
      else handleSubmitForm(defaultGame.image);
    });
  });

  const handleSubmitForm = async (key: string) => {
    const data = form.getValues();
    const game = {
      ...data,
      id: data.id,
      image: key,
    };

    setDisableSubmit(false);
    updateGame(game);
  };

  const gameTypeSelct = GameTypes.map((i) => {
    return { value: i, label: i };
  });

  const handleChangeUnitValue = (value: string) => {
    form.setValue("type", value as never);
  };

  const handleChangeNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      setImgUri(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={open} onOpenChange={(s) => setState({ open: s })}>
      <DialogContent className="max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Game Infomation</DialogTitle>
          <DialogDescription>{defaultGame.name}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex h-full flex-col gap-2">
            <LabelledInput {...form.register("name", { required: true })} label="Game name" />
            <LabelledInput onChange={handleChangeNewImage} label="Image" type="file" />
            <div className="relative aspect-[2/1] w-full">
              {!!previewImgUri && (
                <Image fill src={previewImgUri} alt="Game image" className="object-cover" />
              )}
            </div>
            <div>
              <Label className="mb-1.5">Game instruction</Label>
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
            <div className="mt-0.5 flex items-center gap-2">
              <Label>Allow swap item</Label>
              <FormField
                control={form.control}
                name="itemSwappable"
                render={({ field }) => {
                  console.log("itemswappable", field.value);
                  return (
                    <FormItem>
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  );
                }}
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
