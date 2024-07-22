"use client";

import { Progress } from "@/components/ui/progress";

import BrandNavbar from "../_components/BrandNavbar";
import CreateEventInner from "../_components/CreateEventInner";

export default function CreateEventPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <BrandNavbar />
      <div className="flex flex-col items-center justify-center grow gap-10 p-20">
        <div className="w-4/5">
          <Progress value={20} />
          <div className="flex justify-between items-center text-xl text-gray-500">
            <div />
            <p>Tạo sự kiện</p>
            <p>Tạo vật phẩm</p>
            <p>Tạo voucher</p>
            <div />
          </div>
        </div>
        <div className="container border-2 rounded-sm p-4 shadow-lg">
          <CreateEventInner />
        </div>
      </div>
    </main>
  );
}
