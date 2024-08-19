import { UseFormReturn } from "react-hook-form";

import DatePickerForm from "@/components/global/DatePickerForm";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EventFormData } from "@/services/brand/formSchemas";
import { Event } from "@/services/types";

import Timepicker from "./Timepicker";

type Game = {
  id: Event["games"][number];
  label: string;
};

const games: Game[] = [
  {
    id: "trivia",
    label: "Trivia",
  },
  {
    id: "shake",
    label: "Shake",
  },
];

export default function BasicEventInfoInner({ form }: { form: UseFormReturn<EventFormData> }) {
  const disableGameTime = !form.getValues("games").includes("trivia");

  return (
    <div className="grid grid-cols-2 gap-20">
      <div className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="event.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event name</FormLabel>
              <FormControl>
                <Input required placeholder="2 cùng Highland" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DatePickerForm form={form} name="event.startDate" label="Ngày bắt đầu sự kiện" required />
        <DatePickerForm form={form} name="event.endDate" label="Ngày kết thúc sự kiện" required />
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <Label className="mb-1.5">Event Image</Label>
          <Input type="file" {...form.register("event.image")} required />
        </div>
        <FormField
          control={form.control}
          name="games"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Chọn game sẽ sử dụng trong sự kiện</FormLabel>
                <FormDescription>Chọn ít nhất 1</FormDescription>
              </div>
              {games.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="games"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Label className={disableGameTime ? "text-gray-300" : ""}>
            Thời điểm bắt đầu game mỗi ngày (chỉ cho game Trivia)
          </Label>
          <Timepicker form={form} disabled={disableGameTime} />
        </div>
      </div>
    </div>
  );
}
