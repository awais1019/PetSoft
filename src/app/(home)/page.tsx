import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-pastel-green flex-col xl:flex-row items-center justify-center p-4 xl:p-12 2xl:p-16 gap-8 xl:gap-12 2xl:gap-16">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Description"
        width={519}
        height={472}
        className="h-auto w-full max-w-[519px] xl:max-w-[600px] 2xl:max-w-[680px]"
      />

      <div>
        <Logo />
        <h1 className="max-w-[500px] xl:max-w-[560px] 2xl:max-w-[640px] text-5xl xl:text-6xl 2xl:text-7xl font-semibold my-4">
          Manage your <span className="font-extrabold">pet daycare </span> with
          ease
        </h1>
        <p className="max-w-[600px] xl:max-w-[640px] 2xl:max-w-[680px] font-normal text-2xl 2xl:text-3xl">
          Use to keep track of your pets under your care comfortably. Get
          lifetime access for only <span className="font-semibold">$199</span>
        </p>
        <div className="mt-8 space-x-4">
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
