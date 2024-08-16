import { S3Client as originalClient } from "@aws-sdk/client-s3";

const REIGON = "ap-southeast-1";

const VOUS3Client = new originalClient({
  region: REIGON,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

export default VOUS3Client;
