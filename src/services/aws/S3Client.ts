import { S3Client as originalClient } from "@aws-sdk/client-s3";

const REIGON = "ap-southeast-1";

const VOUS3Client = new originalClient({ region: REIGON });

export default VOUS3Client;
