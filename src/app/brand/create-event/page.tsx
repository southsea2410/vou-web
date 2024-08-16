"use client";

import QRCode from "qrcode";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

import BasicEventInfoInner from "../_components/BasicEventInfoInner";
import BrandNavbar from "../_components/BrandNavbar";
import CreateVoucherInner from "../_components/CreateVoucherInner";
import InviteCoopInner from "../_components/InviteCoopInner";
import { EventFormData } from "@/services/brand/formSchemas";
import { Form } from "@/components/ui/form";
import { CreateEventRequest } from "@/services/brand/useCreateEvent";
import { useUpload } from "@/hooks/useUpload";

export default function CreateEventPage() {
  const eventForm = useForm<EventFormData>({ defaultValues: { games: [] } });

  const { uploadProgress, uploadState, upload } = useUpload();

  const onSubmit = async (formData: EventFormData) => {
    const listGameId_StartTime: CreateEventRequest["listGameId_StartTime"] = formData.games.map(
      (game) => {
        const res = {
          gameId: game === "trivia" ? 1 : 2,
          startTime: game === "trivia" ? formData.trivia_time : "",
        };
        return res;
      },
    );

    formData.games = undefined as never;
    formData.trivia_time = undefined as never;

    const image = await upload(formData.event.image[0] as File);
    if (image) {
      const createEventData: CreateEventRequest = {
        listGameId_StartTime,
        listVoucher_Items: formData.listVoucher_Items,
        brandIds: formData.brandIds.map((i) => i.id),
        event: {
          ...formData.event,
          image: image,
        },
      };

      toast({
        title: "Event created",
        description: "The event has been created successfully\n" + JSON.stringify(createEventData),
      });

      console.log(createEventData);
    }
  };
  return (
    <main className="flex min-h-screen flex-col">
      <BrandNavbar />
      <Form {...eventForm}>
        <form className="grow bg-slate-300 p-4" onSubmit={eventForm.handleSubmit(onSubmit)}>
          <div className="container flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Event Information</CardTitle>
              </CardHeader>
              <CardContent>
                <BasicEventInfoInner form={eventForm} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Add (existing) Vouchers to this Event</CardTitle>
              </CardHeader>
              <CardContent>
                <CreateVoucherInner form={eventForm} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Invite Cooperations</CardTitle>
              </CardHeader>
              <CardContent>
                <InviteCoopInner form={eventForm} />
              </CardContent>
            </Card>
            <Button size="lg" className="text-xl font-medium">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
