import Logo from "@/components/Logo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-pastel-green flex-col xl:flex-row items-center justify-center p-4 xl:p-1  gap-8">
      <Image src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png" alt="Description" width={519} height={472} />
       
      <div>
        <Logo />
        <h1 className="max-w-[500px] text-5xl font-semibold my-4">Manage your <span className="font-extrabold">pet daycare </span> with ease</h1>
        <p className="max-w-[600px] font-normal text-2xl">Use to keep track of your pets under your care comfortably. Get lifetime access for only <span className="font-semibold">$199</span></p>
      </div>
    
    </main>
  );
}
