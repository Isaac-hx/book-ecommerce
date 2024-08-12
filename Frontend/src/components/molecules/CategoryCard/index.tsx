import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  category_cover: string;
  name: string;
};

export const CategoryCard = ({ category_cover, name }: CategoryCardProps) => {
  return (
    // TODO: href to correct category
    <Link href={`/books?category=${name}`} className="flex flex-col items-center space-y-2">
      <figure className="flex h-52 w-52 items-center justify-center overflow-hidden rounded-full border bg-accent p-2">
        <Image
          src={category_cover}
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
