import { useEffect, useState } from "react";
import { Path, UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { EventFormData } from "@/services/brand/formSchemas";

type TimepickerProps = {
  form: UseFormReturn<EventFormData>;
  name: Path<EventFormData>;
  disabled: boolean;
};

export default function Timepicker({ form, disabled, name }: TimepickerProps) {
  const [time, setTime] = useState<[number, number]>([0, 0]);

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const h = parseInt(e.target.value);
    if (h < 0) {
      setTime([0, time[1]]);
      return;
    }
    if (h > 23) {
      setTime([23, time[1]]);
      return;
    }
    setTime([h, time[1]]);
  };
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = parseInt(e.target.value);
    if (m < 0) {
      setTime([time[0], 0]);
      return;
    }
    if (m > 59) {
      setTime([time[0], 59]);
      return;
    }
    setTime([time[0], m]);
  };

  useEffect(() => {
    form.setValue(
      name,
      `${time[0].toString().padStart(2, "0")}:${time[1].toString().padStart(2, "0")}:00`,
    );
  }, [time, form]);

  return (
    <div className="flex items-center gap-0.5">
      <Input
        className="aspect-square w-14"
        disabled={disabled}
        name="hour"
        onChange={handleHourChange}
        value={time[0] < 10 ? "0" + time[0] : time[0]}
      />
      <p className={"text-xl font-bold " + (disabled ? "text-gray-300" : "")}>:</p>
      <Input
        className="aspect-square w-14"
        disabled={disabled}
        name="minute"
        onChange={handleMinuteChange}
        value={time[1] < 10 ? "0" + time[1] : time[1]}
      />
    </div>
  );
}
