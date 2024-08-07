import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  cover_url: string;
  name: string;
};

export const CategoryCard = ({ cover_url, name }: CategoryCardProps) => {
  return (
    // TODO: href to correct category
    <Link href={`/`} className="flex flex-col items-center space-y-2">
      <figure className="flex h-52 w-52 items-center justify-center overflow-hidden rounded-full border bg-accent p-2">
        <Image
          src={cover_url}
          alt={name}
          width={140}
          height={180}
          className="mt-14 object-cover"
        />
      </figure>
      <p className="text-center">{name}</p>
    </Link>
  );
};
