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

import Timepicker from "./Timepicker";
import { GameType, GameTypes } from "@/services/types";
import { useMemo } from "react";

type Game = {
  id: GameType;
  label: string;
};

const games: Game[] = GameTypes.map((type) => {
  return {
    id: type,
    label: type === "quiz" ? "Quiz" : "Shake",
  };
});

export default function BasicEventInfoInner({ form }: { form: UseFormReturn<EventFormData> }) {
  const disableGameTime = !form.getValues("games").includes("quiz");

  const imgFile = form.watch("event.image");

  const imgUrl = useMemo(
    () => imgFile && imgFile.length && URL.createObjectURL((imgFile as FileList)?.[0]),
    [imgFile],
  );

  const startDate = form.watch("event.startDate");

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
        <DatePickerForm
          form={form}
          name="event.startDate"
          label="Ngày bắt đầu sự kiện"
          disabledFn={(date) => false}
          required
        />
        <DatePickerForm
          form={form}
          name="event.endDate"
          label="Ngày kết thúc sự kiện"
          disabledFn={(date) => startDate && date < startDate}
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <Label className="mb-1.5">Event Image</Label>
          <Input type="file" {...form.register("event.image")} required />
        </div>
        <div className="aspect-[2/1]">{!!imgUrl && <img src={imgUrl} />}</div>
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
            Thời điểm bắt đầu game mỗi ngày (chỉ cho game Quiz)
          </Label>
          <Timepicker form={form} disabled={disableGameTime} />
        </div>
      </div>
    </div>
  );
}
