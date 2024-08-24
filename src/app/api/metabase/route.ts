import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY;

export async function GET(request: NextRequest) {
  let value = "";
  const dashboardId = request.nextUrl.searchParams.get("dashboardId");
  console.log("dashboardId", dashboardId);

  if (METABASE_SECRET_KEY) {
    const payload = {
      resource: { dashboard: Number(dashboardId) },
      params: {},
      exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
    };
    value = jwt.sign(payload, METABASE_SECRET_KEY);
  }

  return Response.json({ value });
}
