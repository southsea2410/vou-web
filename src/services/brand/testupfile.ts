async function put(url: string, data: any) {
  return fetch(url, {
    method: "PUT",
    body: data,
    headers: [["content-type", new Blob(data).size.toString()]],
  });
}
export const fileUpload = async () => {
  const BUCKET = "brand_image_bucket";
  const KEY = "example_file.txt";

  // There are two ways to generate a presigned URL.
  // 2. Use getSignedUrl in conjunction with the S3 client and GetObjectCommand.
  try {
    const clientUrl = await createPresignedUrlWithClient({
      bucket: BUCKET,
      key: KEY,
    });

    // After you get the presigned URL, you can provide your own file
    // data. Refer to put() above.

    console.warn("Calling PUT using presigned URL with client");
    await put(clientUrl, "Hello World");

    console.log("\nDone. Check your S3 console.");
  } catch (err) {
    console.error(err);
  }
};
// snippet-end:[s3.JavaScript.buckets.presignedurlv3]

// Invoke main function if this file was run directly.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
