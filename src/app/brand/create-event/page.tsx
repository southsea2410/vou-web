"use client";

import QRCode from "qrcode";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useUpload } from "@/hooks/useUpload";
import { EventFormData } from "@/services/brand/formSchemas";
import useCreateEvent, { CreateEventRequest } from "@/services/brand/useCreateEvent";

import BasicEventInfoInner from "../_components/BasicEventInfoInner";
import BrandNavbar from "../_components/BrandNavbar";
import CreateVoucherInner from "../_components/CreateVoucherInner";
import InviteCoopInner from "../_components/InviteCoopInner";
import useGetProfileByAccountId from "@/services/brand/useGetProfileByAccountId";
import { useAuth } from "@/providers/ClientAuthProvider";

export default function CreateEventPage() {
  const { accountId } = useAuth();
  const { data: profile } = useGetProfileByAccountId(accountId, { enabled: !!accountId });

  const eventForm = useForm<EventFormData>({ defaultValues: { games: [] } });
  const { upload } = useUpload();

  const { mutate: createEvent } = useCreateEvent({
    onError(err) {
      toast({
        title: "Failed to create event",
        description: err.message,
        variant: "destructive",
      });
    },
    onSuccess(data) {
      toast({
        title: "Event created successfully",
      });
    },
  });

  const onSubmit = async (formData: EventFormData) => {
    const listGameId_StartTime: CreateEventRequest["listGameId_StartTime"] = formData.games.map(
      (game) => {
        const res = {
          gameId: game === "quiz" ? 1 : 2,
          gameType: game,
          startTime: game === "quiz" ? formData.quiz_time : "",
        };
        return res;
      },
    );

    formData.games = undefined as never;
    formData.quiz_time = undefined as never;

    const image = await upload(formData.event.image[0] as File);
    if (image) {
      const createEventData: CreateEventRequest = {
        listGameId_StartTime,
        listVoucher_Items: formData.listVoucher_Items,
        emails: [profile?.email ?? "", ...formData.emails.map((i) => i.id)],
        event: {
          ...formData.event,
          image: image,
          numberOfVoucher: 0,
          startDate: formData.event.startDate.toISOString(),
          endDate: formData.event.endDate.toISOString(),
        },
      };

      createEvent(createEventData);
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
