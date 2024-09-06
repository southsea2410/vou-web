"use client";

import React, { useCallback, useEffect, useState } from "react";

import useGetMetabaseToken, { MetabasePayload } from "@/services/admin/useGetMetabaseToken";

export default function MetabaseFrame({ payload }: { payload: MetabasePayload }) {
  const METABASE_SITE_URL = process.env.NEXT_PUBLIC_METABASE_SITE_URL;

  const { data: token, isSuccess } = useGetMetabaseToken(payload);

  const [src, setSrc] = useState<string | undefined>(undefined);

  const metabase_url = useCallback(
    (token: string) =>
      METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true",
    [METABASE_SITE_URL],
  );

  useEffect(() => {
    console.log("token", token);
    if (isSuccess) setSrc(metabase_url(token.value));
  }, [token, isSuccess, setSrc, metabase_url]);

  return /*#__PURE__*/ React.createElement("iframe", {
    src: src,
    className: "absolute top-0 bottom-0 right-0 left-0 size-full",
  });
}
