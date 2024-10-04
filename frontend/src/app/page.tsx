import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="animate-pulse-fade"
          src="/images/logo_sentinel.png"
          alt="Sentinel"
          width={370}
          height={370}
          priority
        />
        <div className="max-w-md mx-auto text-center">
          <Link href="https://x.com/sentinel_fi" target="_blank">
            <Image
              className="border-none"
              src="/images/x.jpg"
              alt="Social"
              width={75}
              height={75}
            />
          </Link>
        </div>
        <div className="max-w-md mx-auto text-center">
          <p className="text-3xl mb-8">Hedge Risks on Soroban</p>
          <p className="text-xl">Coming Soon...</p>
        </div>
        <br />
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4 content-center">
          <Image
            src="/images/SCFLogoWithName.svg"
            alt="SCF"
            width={125}
            height={125}
          />
          <Image
            src="/images/BIGGER.svg"
            alt="BIGGER"
            width={100}
            height={100}
          />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
