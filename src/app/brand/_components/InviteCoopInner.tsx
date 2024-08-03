import { TrashIcon } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type InviteCoopForm = {
  invites: {
    email: string;
  }[];
};

export default function InviteCoopInner({ form }: { form: UseFormReturn<InviteCoopForm> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "invites",
  });

  const handleAdd = () => {
    append({ email: "" });
  };

  return (
    <div>
      <Button type="button" onClick={handleAdd} className="mb-2">
        Mời thêm
      </Button>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input
              type="email"
              placeholder="Email đối tác"
              {...form.register(`invites.${index}.email`)}
              className="w-52"
            />
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="aspect-square"
              onClick={() => remove(index)}
            >
              <TrashIcon />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
