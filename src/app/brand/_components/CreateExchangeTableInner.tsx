import { DateRangePicker } from "@/components/global/DateRangePicker";
import LabelledInput from "@/components/global/LabelledInput";
import { Label } from "@/components/ui/label";

export default function CreateExchangeTableInner() {
  return (
    <div className="flex flex-col gap-3">
      <LabelledInput id="eventName" label="Tên sự kiện" />
      <div className="grid w-full items-center gap-1.5">
        <Label>Thời gian diễn ra</Label>
        <DateRangePicker className="w-full" />
      </div>
      <LabelledInput id="eventThumbnail" label="Thumbnail sự kiện (ảnh 16:9)" type="file" />
    </div>
  );
}
