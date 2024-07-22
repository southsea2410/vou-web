import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center gap-10">
      <Button
        style={{ height: "400px", width: "600px" }}
        className="text-4xl"
        variant="outline"
        asChild
      >
        <Link href="/admin">Admin</Link>
      </Button>
      <Button style={{ height: "400px", width: "600px" }} className="text-4xl" asChild>
        <Link href="/brand">Brand</Link>
      </Button>
    </main>
  );
}
