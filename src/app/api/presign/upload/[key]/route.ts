import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import S3Client from "@/services/aws/S3Client";

const bucket = "vouawsbucket";

export async function GET(request: Request, { params }: { params: { key: string } }) {
  const command = new PutObjectCommand({ Bucket: bucket, Key: params.key });
  const signedUrl = await getSignedUrl(S3Client, command, { expiresIn: 900 });
  return Response.json({ signedUrl });
}

// export const fetchCache = "force-no-store";
