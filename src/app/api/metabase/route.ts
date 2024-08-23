import jwt from "jsonwebtoken";

const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY;

export async function GET(request: Request) {
  let value = "";

  if (METABASE_SECRET_KEY) {
    const payload = {
      resource: { dashboard: 2 },
      params: {},
      exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
    };
    value = jwt.sign(payload, METABASE_SECRET_KEY);
  }

  return Response.json({ value });
}
