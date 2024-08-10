import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import S3Client from "@/services/aws/S3Client";

const bucket = "brand_bucket";

export async function GET(request: Request, { params }: { params: { key: string } }) {
  const key = params.key;
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  const signedUrl = await getSignedUrl(S3Client, command, { expiresIn: 900 });
  return Response.json({ signedUrl });
}
