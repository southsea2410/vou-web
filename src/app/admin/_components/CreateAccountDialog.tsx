import { useForm } from "react-hook-form";

import LabelledInput from "@/components/global/LabelledInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  AccountRoleType,
  BrandProfile,
  DialogState,
  Game,
  GameTypes,
  PlayerProfile,
} from "@/services/types";
import { Select } from "@/components/global/Select";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useUpload } from "@/hooks/useUpload";
import useUpdateGame from "@/services/admin/useUpdateGame";
import useGetObjectUrl from "@/hooks/useGetObjectUrl";
import useCreateAccount from "@/services/identity/useCreateAccount";
import useCreateProfile from "@/services/identity/useCreateProfile";
import { ExternalLink, MapPin } from "lucide-react";
import { getLocation } from "@/lib/utils";

type CreateAccountStep = {
  role: "brand" | "player" | null;
  s: 0 | 1;
};

type AccountForm = {
  username: string;
  password: string;
};

export default function CreateAccountDialog() {
  const [accountId, setAccountId] = useState("");
  const [username, setUsername] = useState("");
  const [step, setStep] = useState<CreateAccountStep>({
    role: null,
    s: 0,
  });

  const { mutate: createAccount } = useCreateAccount({
    onSuccess(data, variables, context) {
      if (data.result?.id && username) {
        toast({
          title: "Account " + username + " created",
          description: "Account has been created successfully",
        });

        setAccountId(data.result.id);

        createProfile({
          ...(step.role === "brand" ? { ...brandForm.getValues() } : { ...playerForm.getValues() }),
          accountId: data.result.id,
          username,
        });
      }
    },
  });

  const { mutate: createProfile } = useCreateProfile({
    onSuccess(data, variables, context) {
      toast({
        title: "Profile created",
        description: "Profile has been created successfully",
      });
    },
  });

  // Account logics
  const accountForm = useForm<AccountForm>();

  // Brand logics
  const brandForm = useForm<BrandProfile>({
    defaultValues: {
      status: false,
    },
  });

  const handleGetCurrentLocation = () => {
    getLocation((position) => {
      brandForm.setValue("latitude", position.coords.latitude);
      brandForm.setValue("longitude", position.coords.longitude);
    });
  };

  // Player logics
  const playerForm = useForm<PlayerProfile & { newImage: FileList }>({
    defaultValues: {
      status: false,
    },
  });
  const newImgFile = playerForm.watch("newImage");
  const newImgUrl = useMemo(
    () => newImgFile && newImgFile.length && URL.createObjectURL(newImgFile[0]),
    [newImgFile],
  );
  const genderSelectOptions = ["male", "female", "other"].map((g) => ({ label: g, value: g }));

  // Submit logics
  const handleClickSubmit = () => {
    const username = accountForm.getValues("username");
    const password = accountForm.getValues("password");
    const roles = [step.role as AccountRoleType];

    setUsername(username);

    createAccount({ username, password, roles });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>Fill the form to create a new account</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          {step.s === 0 && (
            <div>
              <form {...accountForm}>
                <LabelledInput
                  label="Username"
                  {...accountForm.register("username", { required: true })}
                  className="mb-2"
                />
                <LabelledInput
                  label="Password"
                  {...accountForm.register("password", { required: true })}
                  type="password"
                  className="mb-3"
                />
              </form>
            </div>
          )}
          {step.s === 1 && step.role === "brand" && (
            <Form {...brandForm}>
              <form className="flex h-full flex-col gap-2.5">
                <p className="font-medium text-primary">General information</p>
                <LabelledInput
                  {...brandForm.register("fullName", { required: true })}
                  label="Full name"
                />
                <LabelledInput {...brandForm.register("email", { required: true })} label="Email" />
                <LabelledInput {...brandForm.register("phone", { required: true })} label="Phone" />
                <p className="mt-2 font-medium text-primary">Brand information</p>
                <LabelledInput
                  {...brandForm.register("brandName", { required: true })}
                  label="Brand name"
                />
                <LabelledInput {...brandForm.register("field", { required: true })} label="Field" />
                <div className="flex items-end gap-2">
                  <LabelledInput
                    {...brandForm.register("latitude", { required: true })}
                    type="number"
                    label="Latitude"
                  />
                  <LabelledInput
                    {...brandForm.register("longitude", { required: true })}
                    type="number"
                    label="Longitude"
                  />
                  <Button variant="ghost" type="button" onClick={handleGetCurrentLocation}>
                    <span>
                      <MapPin className="mr-2" />
                    </span>
                    Current location
                  </Button>
                </div>
                <LabelledInput
                  {...brandForm.register("address", { required: true })}
                  label="Address"
                />
              </form>
            </Form>
          )}
          {step.s === 1 && step.role === "player" && (
            <Form {...playerForm}>
              <form className="flex h-full flex-col gap-2.5">
                <p className="font-medium text-primary">General information</p>
                <LabelledInput
                  {...playerForm.register("fullName", { required: true })}
                  label="Full name"
                />
                <LabelledInput
                  {...playerForm.register("email", { required: true })}
                  label="Email"
                />
                <LabelledInput
                  {...playerForm.register("phone", { required: true })}
                  label="Phone"
                />
                <p className="mt-2 font-medium text-primary">Player information</p>
                <div className="flex w-full gap-2">
                  <label className="aspect-square h-36 w-36 rounded-full hover:cursor-pointer hover:bg-slate-800 hover:bg-opacity-25">
                    {!!newImgUrl && <img src={newImgUrl} width={144} height={144} alt="Avatar" />}
                    {!newImgUrl && (
                      <p className="text-center font-medium leading-[144px] text-white">
                        Upload Avatar
                      </p>
                    )}
                    <input
                      type="file"
                      {...playerForm.register("newImage")}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  <div className="flex grow flex-col gap-2">
                    <div>
                      <Label className="mb-1.5">Gender</Label>
                      <Select
                        onChange={(value) => playerForm.setValue("gender", value)}
                        data={genderSelectOptions}
                      />
                    </div>
                    <LabelledInput
                      {...playerForm.register("dateOfBirth", { required: true })}
                      label="Date of birth"
                      type="date"
                    />
                  </div>
                </div>
                <LabelledInput
                  {...playerForm.register("turns", { required: true })}
                  label="Game turns"
                  type="number"
                />
                <LabelledInput
                  {...playerForm.register("facebookAccount", { required: true })}
                  label="Facebook account"
                />
              </form>
            </Form>
          )}
        </div>
        <DialogFooter>
          {step.s === 0 && (
            <div className="flex w-full items-center justify-center gap-2">
              <Button onClick={() => setStep({ role: "player", s: 1 })}>Create Player</Button>
              <Button onClick={() => setStep({ role: "brand", s: 1 })}>Create Brand</Button>
            </div>
          )}
          {step.s === 1 && <Button onClick={handleClickSubmit}>Create account</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
