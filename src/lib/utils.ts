import axios from "axios";
import { ClassValue, clsx, type } from "clsx";
import QRCode from "qrcode";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateQR(qrcode: string): Promise<File> {
  const dataUrl = await QRCode.toDataURL(qrcode);
  const res = await axios.get(dataUrl);
  const file = new File([res.data], qrcode + ".png", { type: "image/png" });
  return file;
}
