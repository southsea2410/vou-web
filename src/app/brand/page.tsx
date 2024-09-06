"use client";

import { useAuth } from "@/providers/ClientAuthProvider";
import MetabaseFrame from "../admin/_components/MetabaseFrame";
import BrandNavbar from "./_components/BrandNavbar";
import useGetProfileByAccountId from "@/services/brand/useGetProfileByAccountId";
import LoadingBlock from "@/components/global/LoadingBlock";

export default function BrandHomepage() {
  const { accountId } = useAuth();
  const { data: profile } = useGetProfileByAccountId(accountId, { enabled: !!accountId });

  return (
    <div className="flex min-h-screen flex-col">
      <BrandNavbar />
      <div className="relative mt-10 h-[85vh] p-4">
        {!!profile ? (
          <MetabaseFrame
            payload={{
              resource: { dashboard: 3 },
              params: {
                brand_id: profile.id,
              },
            }}
          />
        ) : (
          <LoadingBlock />
        )}
      </div>
    </div>
  );
}
