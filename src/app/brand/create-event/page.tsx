"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { EventNoId } from "@/hooks/types";

import BasicEventInfoInner from "../_components/BasicEventInfoInner";
import BrandNavbar from "../_components/BrandNavbar";
import CreateVoucherInner, { CreateVoucherForm } from "../_components/CreateVoucherInner";

export default function CreateEventPage() {
  const eventForm = useForm<EventNoId>({ defaultValues: { games: [] } });
  const voucherForm = useForm<CreateVoucherForm>();

  const onSubmit = () => {
    const event = eventForm.getValues();
    const voucher = voucherForm.getValues();

    event.vouchers = voucher.vouchers;

    console.log(event);
  };
  return (
    <main className="flex min-h-screen flex-col">
      <BrandNavbar />
      <div className="flex grow flex-col gap-8 bg-slate-300 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Tạo sự kiện</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...eventForm}>
              <form className="space-y-8">
                <BasicEventInfoInner form={eventForm} />
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tạo Voucher</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...voucherForm}>
              <form className="space-y-8">
                <CreateVoucherInner form={voucherForm} />
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tạo Voucher</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...voucherForm}>
              <form className="space-y-8">
                <CreateVoucherInner form={voucherForm} />
              </form>
            </Form>
          </CardContent>
        </Card>
        <Button onClick={onSubmit} size="lg" className="text-xl font-medium">
          Submit
        </Button>
      </div>
    </main>
  );
}
