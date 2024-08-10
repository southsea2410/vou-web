import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import S3Client from "@/services/aws/S3Client";

type CreatePresignedUrlWithClientProps = {
  bucket: string;
  key: string;
};

export async function GET(request: Request) {
  const { bucket, key } = request.query as CreatePresignedUrl;
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  const signedUrl = await getSignedUrl(S3Client, command, { expiresIn: 900 });
  return Response.json({ signedUrl });
}
