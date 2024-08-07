"use client";

import QRCode from "qrcode";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import BasicEventInfoInner, { BasicEventInfoForm } from "../_components/BasicEventInfoInner";
import BrandNavbar from "../_components/BrandNavbar";
import CreateVoucherInner, { CreateVoucherForm } from "../_components/CreateVoucherInner";
import InviteCoopInner, { InviteCoopForm } from "../_components/InviteCoopInner";

export default function CreateEventPage() {
  const eventForm = useForm<BasicEventInfoForm>({ defaultValues: { games: [] } });
  const voucherForm = useForm<CreateVoucherForm>({ defaultValues: { vouchers: [] } });
  const inviteForm = useForm<InviteCoopForm>({ defaultValues: { invites: [{ email: "" }] } });

  const onSubmit = async () => {
    const event = eventForm.getValues();
    const vouchers = voucherForm.getValues();
    const invites = inviteForm.getValues();

    event.vouchers = vouchers.vouchers;
    event.invites = invites.invites;

    if (!(await eventForm.trigger()))
      toast({ variant: "destructive", title: "Event info error\n" + JSON.stringify(event) });
    else if (!(await voucherForm.trigger()))
      toast({ variant: "destructive", title: "Voucher info error\n" + JSON.stringify(vouchers) });
    else if (!(await inviteForm.trigger()))
      toast({ variant: "destructive", title: "Invite info error\n" + JSON.stringify(invites) });
    else
      toast({
        title: "Event created",
        description: "The event has been created successfully\n" + JSON.stringify(event),
      });

    console.log(event);
  };
  return (
    <main className="flex min-h-screen flex-col">
      <BrandNavbar />
      <div className="flex grow flex-col gap-4 bg-slate-300 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Create Event Information</CardTitle>
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
            <CardTitle>Create Vouchers</CardTitle>
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
            <CardTitle>Invite Cooperations</CardTitle>
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
