import Image from "next/image";
import home_bird from "@/public/img/home_bird.png";

export default function Home() {
  return (
    <div className="container flex flex-col md:flex-row gap-5 h-[calc(100vh-4rem)]">
      <div className="basis-full flex flex-col justify-center md:basis-2/3">
        <p className="special-word text-xs">Protect All the Birds</p>
        <h1 className="pb-5">
          The World&apos;s <span className="special-word">Rarest</span>
          <br /> Birds
        </h1>

        <p>
          Discover the fascinating world of avian wonders. From the majestic
          Bald Eagle to the elusive Kakapo, explore the diverse species that
          grace our planet. Join us in our mission to protect and preserve these
          incredible creatures for future generations.
        </p>
      </div>

      <div className="hidden md:block basis-1/3">
        <Image
          src={home_bird}
          alt="Home bird"
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
