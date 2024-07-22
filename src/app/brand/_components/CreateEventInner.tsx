import { DateRangePicker } from "@/components/global/DateRangePicker";
import LabelledInput from "@/components/global/LabelledInput";
import { Label } from "@/components/ui/label";

export default function CreateEventInner() {
  return (
    <div>
      <p className="mb-4 text-3xl">Tạo sự kiện</p>
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-3">
          <LabelledInput id="eventName" label="Tên sự kiện" />
          <div>
            <Label>Thời gian diễn ra</Label>
            <DateRangePicker className="w-full" />
          </div>
          <LabelledInput id="eventThumbnail" label="Thumbnail sự kiện (ảnh 16:9)" type="file" />
        </div>
        <div></div>
      </div>
    </div>
  );
}
