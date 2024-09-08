import { ClassValue, clsx } from "clsx";
import QRCode from "qrcode";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function dataURItoBlob(dataURI: string): Blob {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var binary = atob(dataURI.split(",")[1]);
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: mimeString });
}

export async function generateQR(qrcode: string): Promise<File> {
  const dataUrl = await QRCode.toDataURL(qrcode);
  const blob = dataURItoBlob(dataUrl);
  const file = new File([blob], qrcode + ".png");
  return file;
}

// Pad a number to 2 digits
const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
// Get timezone offset in ISO format (+hh:mm or -hh:mm)
const getTimezoneOffset = (date: Date) => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? "+" : "-";
  return diff + pad(tzOffset / 60) + ":" + pad(tzOffset % 60);
};

export const toISOStringWithTimezone = (date: Date) => {
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    "Z"
  );
};
