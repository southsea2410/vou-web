"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import BasicEventInfoInner, { BasicEventInfoForm } from "../_components/BasicEventInfoInner";
import BrandNavbar from "../_components/BrandNavbar";
import CreateVoucherInner, { CreateVoucherForm } from "../_components/CreateVoucherInner";
import InviteCoopInner, { InviteCoopForm } from "../_components/InviteCoopInner";

export default function CreateEventPage() {
  const eventForm = useForm<BasicEventInfoForm>({ defaultValues: { games: [] } });
  const voucherForm = useForm<CreateVoucherForm>({ defaultValues: { vouchers: [] } });
  const inviteForm = useForm<InviteCoopForm>({ defaultValues: { invites: [{ email: "" }] } });

  const onSubmit = () => {
    const event = eventForm.getValues();
    const voucher = voucherForm.getValues();

    // event.vouchers = voucher.vouchers;

    console.log(event);
  };
  return (
    <main className="flex min-h-screen flex-col">
      <BrandNavbar />
      <div className="flex grow flex-col gap-4 bg-slate-300 p-4">
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
            <CardTitle>Mời đối tác</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...inviteForm}>
              <form className="space-y-8">
                <InviteCoopInner form={inviteForm} />
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
