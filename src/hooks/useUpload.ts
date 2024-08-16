import axios from "axios";
import { headers } from "next/headers";
import { useState } from "react";

export type UploadState = "idle" | "starting" | "uploading" | "finishing" | "done" | "error";

export function useUpload() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<Error | null>(null);

  return {
    uploadState,
    uploadProgress,
    uploadError,
    upload: async (file: File, onSuccess?: (uploadKey: string) => Promise<void>) => {
      setUploadState("starting");

      try {
        // Grab a pre-signed URL from our backend API:
        const { key, presigned_upload_url } = await getPresignedUrl(file);
        setUploadState("uploading");
        console.log("Uploading", file.name, "to", presigned_upload_url);

        // Actually upload using XmlHttpRequest:
        await uploadFile(file, presigned_upload_url, (pct) => {
          setUploadProgress(pct);
        });
        setUploadState("finishing");

        // Do something useful with this uploaded file; probably pass
        // this key to another API endpoint!
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

async function getPresignedUrl(file: File): Promise<{ key: string; presigned_upload_url: string }> {
  try {
    const key = crypto.randomUUID() + "_" + file.name;
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
    // const xhr = new XMLHttpRequest();
    // xhr.upload.addEventListener("progress", (e) => {
    //   if (e.lengthComputable) {
    //     const pct = e.loaded / e.total;
    //     onProgress(pct * 100);
    //   }
    // });
    // xhr.upload.addEventListener("error", (e) => {
    //   reject(new Error("Upload failed: " + e.toString()));
    // });
    // xhr.upload.addEventListener("abort", (e) => {
    //   reject(new Error("Upload aborted: " + e.toString()));
    // });
    // xhr.addEventListener("load", (e) => {
    //   if (xhr.status === 200) {
    //     resolve();
    //   } else {
    //     reject(new Error("Upload failed " + xhr.status));
    //   }
    // });
    // xhr.open("PUT", presignedUploadUrl, true);
    // xhr.setRequestHeader("Content-Type", file.type);
    // xhr.setRequestHeader("Content-Length", file.size.toString());
    // try {
    //   xhr.send(file);
    // } catch (e: any) {
    //   reject(new Error("Upload failed: " + e.toString()));
    // }

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
