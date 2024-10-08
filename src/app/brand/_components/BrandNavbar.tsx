"use client";

import Image from "next/image";
import Link from "next/link";

import Navbar, { Destination } from "@/components/global/Navbar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/ClientAuthProvider";
import { LogOut, User2 } from "lucide-react";
import UpdateBrandDialog from "@/app/admin/_components/UpdateBrandDialog";
import { useState } from "react";
import { BrandProfile, DialogState } from "@/services/types";
import { UpdateProfileRequest } from "@/services/identity/useUpdateProfile";
import useGetProfileByAccountId from "@/services/brand/useGetProfileByAccountId";

const destinations: Destination[] = [
  {
    href: "/brand",
    label: "General",
  },
  {
    href: "/brand/vouchers",
    label: "Vouchers",
  },
  {
    href: "/brand/items",
    label: "Items",
  },
  {
    href: "/brand/events",
    label: "Events",
  },
];

export default function BrandNavbar() {
  const auth = useAuth();

  const { data: profile } = useGetProfileByAccountId(auth.accountId, { enabled: !!auth.accountId });

  const handleSignout = () => {
    toast({
      title: "Signing out",
    });
    auth.logout();
    location.href = "/";
  };

  const [updateBrandDialog, setUpdateBrandDialog] = useState<
    DialogState<UpdateProfileRequest<BrandProfile>["newProfile"]>
  >({
    open: false,
  });

  const onClickUpdateProfile = () => {
    setUpdateBrandDialog({
      open: true,
      item: profile as UpdateProfileRequest<BrandProfile>["newProfile"],
    });
  };
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 px-4">
      <Navbar title="Brands - Mangement center" destinations={destinations} />
      <Button asChild>
        <Link href="/brand/create-event">Create event</Link>
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="ml-auto rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {" "}
            <Image
              src="https://avatar.iran.liara.run/public"
              alt="User Avatar"
              width={56}
              height={56}
              className="rounded-full"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-28 p-0.5" align="end">
          <Command>
            <CommandList>
              <CommandGroup>
                <CommandItem className="hover:cursor-pointer" onSelect={onClickUpdateProfile}>
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </CommandItem>
                <CommandItem onSelect={handleSignout} className="hover:cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <UpdateBrandDialog {...updateBrandDialog} setState={setUpdateBrandDialog} />
    </div>
  );
}
