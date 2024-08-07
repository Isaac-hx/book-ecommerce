import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type HeroProps = {
  title: string;
  description: string;
  id: number;
  cover_url: string;
};

export const Hero = ({ title, description, id, cover_url }: HeroProps) => {
  return (
    <div className="flex h-full items-center justify-between gap-4">
      <div className="flex w-full flex-col justify-center md:px-24">
        <h2 className="text-sm font-semibold md:text-2xl md:font-bold">
          {title}
        </h2>
        <p className="line-clamp-3 text-sm md:text-base">{description}</p>
        <Button className="mt-5 w-fit" variant={"outline"}>
          <Link href={`/books/${id}`}>Lihat buku</Link>
        </Button>
      </div>
      <figure className="flex h-40 w-full justify-center md:h-80">
        <Image
          src={cover_url}
          alt={title}
          width={165}
          height={200}
          className="h-full w-fit rounded border bg-secondary object-scale-down p-2 md:h-80 md:object-contain"
        />
      </figure>
    </div>
  );
};
