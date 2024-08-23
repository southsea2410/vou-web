"use client";

import { LogOut } from "lucide-react";
import Image from "next/image";

import Navbar, { Destination } from "@/components/global/Navbar";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/providers/ClientAuthProvider";
import { toast } from "@/components/ui/use-toast";

const destinations: Destination[] = [
  {
    href: "/admin",
    label: "General",
  },
  {
    href: "/admin/events",
    label: "Events",
  },
  {
    href: "/admin/accounts",
    label: "Accounts",
  },
  {
    href: "/admin/items",
    label: "Items",
  },
  {
    href: "/admin/vouchers",
    label: "Vouchers",
  },
];

export default function AdminNavbar() {
  const auth = useAuth();
  const handleSignout = () => {
    toast({
      description: "Signing out",
    });
    auth.logout();
    location.href = "/";
  };
  return (
    <div className="flex items-center justify-between border-b border-gray-100 px-4">
      <Navbar title="Admin - Management center" destinations={destinations} />
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
                <CommandItem onSelect={handleSignout} className="hover:cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
