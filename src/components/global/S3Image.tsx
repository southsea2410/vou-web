import useGetObjectUrl from "@/hooks/useGetObjectUrl";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

export default function S3Image({ k, ...props }: Omit<ImageProps, "src"> & { k: string }) {
  const [src, setSrc] = useState<string>("");

  const { data: url } = useGetObjectUrl(k);

  useEffect(() => {
    if (url) setSrc(url);
  }, [url]);

  return <img {...props} alt={props.alt} src={src} />;
}
