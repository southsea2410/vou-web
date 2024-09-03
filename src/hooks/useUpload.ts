import axios from "axios";
import { headers } from "next/headers";
import { useState } from "react";

export type UploadState = "idle" | "starting" | "uploading" | "finishing" | "done" | "error";

export function useUpload() {
  const [uploadKey, setUploadKey] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<Error | null>(null);

  return {
    uploadKey,
    uploadState,
    uploadProgress,
    uploadError,
    upload: async (file: File, onSuccess?: (uploadKey: string) => Promise<void>) => {
      setUploadState("starting");

      try {
        // Grab a pre-signed URL from our backend API:
        const { key, presigned_upload_url } = await getPresignedUrl(file.name);
        setUploadState("uploading");
        console.log("Uploading", file.name, "to", presigned_upload_url);

        // Actually upload using XmlHttpRequest:
        await uploadFile(file, presigned_upload_url, (pct) => {
          setUploadProgress(pct);
        });
        setUploadState("finishing");

        // Do something useful with this uploaded file; probably pass
        // this key to another API endpoint!
        setUploadKey(key);
        onSuccess && (await onSuccess(key));
        setUploadState("done");
        return key;
      } catch (e: any) {
        setUploadState("error");
        setUploadError(e);
      }
    },
  };
}

export async function getPresignedUrl(
  filename: string,
): Promise<{ key: string; presigned_upload_url: string }> {
  try {
    const key = crypto.randomUUID() + "_" + filename;
    const response = await axios(`/api/presign/upload/${key}`, {
      method: "GET",
    });

    return {
      key,
      presigned_upload_url: response.data.signedUrl,
    };
  } catch (e: any) {
    throw new Error("Failed to get presigned URL: " + e.toString());
  }
}

function uploadFile(
  file: File,
  presignedUploadUrl: string,
  onProgress: (pct: number) => void,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    console.log("Uploading to", presignedUploadUrl);

    axios
      .put(presignedUploadUrl, file, {
        onUploadProgress(e) {
          if (e.lengthComputable) {
            const pct = e.loaded / (e.total ?? 1);
            onProgress(pct * 100);
          }
        },
        headers: {
          "Content-Type": file.type,
          "Content-Length": file.size.toString(),
        },
      })
      .then(() => resolve())
      .catch(reject);
  });
}
