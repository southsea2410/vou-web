import { MetabasePayload } from "@/services/admin/useGetMetabaseToken";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY;

export async function POST(request: NextRequest) {
  let value = "";
  const requestPayload = (await request.json()) as MetabasePayload;
  console.log("requestPayload", requestPayload);
  if (METABASE_SECRET_KEY) {
    const payload = {
      ...requestPayload,
      exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
    };
    value = jwt.sign(payload, METABASE_SECRET_KEY);
  }

  return Response.json({ value });
}
