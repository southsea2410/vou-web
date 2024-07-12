"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useGetMetabaseToken from "@/services/admin/useGetMetabaseToken";
import { useEffect, useRef, useState } from "react";

const METABASE_SITE_URL = process.env.NEXT_PUBLIC_METABASE_SITE_URL;

export default function AdminHomepage() {
  const { data: token, isSuccess } = useGetMetabaseToken();

  const [src, setSrc] = useState<string | undefined>(undefined);

  const metabase_url = (token: string) =>
    METABASE_SITE_URL +
    "/embed/dashboard/" +
    token +
    "#bordered=true&titled=true";

  useEffect(() => {
    console.log("token", token);
    if (isSuccess) setSrc(metabase_url(token.value));
  }, [token, isSuccess, setSrc]);

  return (
    <div className="h-screen p-4 flex flex-col">
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-3xl font-bold mb-5">Dashboard</p>
      <div className="relative flex-1">
        <iframe
          src={src}
          className="absolute top-0 bottom-0 right-0 left-0 size-full"
        />
      </div>
    </div>
  );
}
