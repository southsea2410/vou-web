import { UseFormReturn } from "react-hook-form";

import DatePickerForm from "@/components/global/DatePickerForm";
import LabelledInput from "@/components/global/LabelledInput";
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

export type BasicEventInfoForm = {
  name: string;
  // image: FileList;
  start_date: Date;
  end_date: Date;
  games: Event["games"];
  game_time?: string;
};

export default function BasicEventInfoInner({ form }: { form: UseFormReturn<BasicEventInfoForm> }) {
  const disableGameTime = !form.watch("games").includes("trivia");

  return (
    <div className="grid grid-cols-2 gap-20">
      <div className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sự kiện</FormLabel>
              <FormControl>
                <Input required placeholder="2 cùng Highland" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DatePickerForm form={form} name="start_date" label="Ngày bắt đầu sự kiện" required />
        <DatePickerForm form={form} name="end_date" label="Ngày kết thúc sự kiện" required />
      </div>
      <div className="flex flex-col gap-3">
        <LabelledInput label="Thumbnail sự kiện" type="file" />
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
