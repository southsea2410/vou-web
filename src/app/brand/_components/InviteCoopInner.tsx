import { TrashIcon } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventFormData } from "@/services/brand/formSchemas";

export default function InviteCoopInner({ form }: { form: UseFormReturn<EventFormData> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emails",
  });

  const handleAdd = () => {
    append({ id: "" });
  };

  return (
    <div>
      <Button type="button" onClick={handleAdd} className="mb-2">
        Invite more
      </Button>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input
              type="email"
              placeholder="otherbrand@gmail.com"
              {...form.register(`emails.${index}.id` as "emails.0.id")}
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
