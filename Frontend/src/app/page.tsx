import { BookCard, CategoryCard, Hero } from "@/components/molecules";
import { BookSection } from "@/components/organisms";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { axiosInstance } from "@/lib/api";
import { GetBooksResponse } from "@/services/book/types";
import { GetCategoriesResponse } from "@/services/category/types";

export default async function Home() {
  const { data: books } = await axiosInstance.get<GetBooksResponse>("/books", {
    params: {
      limit: 13,
    },
  });

  const { data: newBooks } = await axiosInstance.get<GetBooksResponse>(
    "/books",
    {
      params: {
        sort_by: "asc",
        limit: 5,
      },
    },
  );

  const { data: categories } =
    await axiosInstance.get<GetCategoriesResponse>("/category");

  return (
    <div className="container flex min-h-screen flex-col gap-12 p-12">
      <div className="w-full rounded bg-gradient-to-l from-blue-100 via-blue-300 to-primary p-4 shadow md:h-96">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {books.data.slice(0, 3).map((book) => (
              <CarouselItem key={book.title}>
                <Hero {...book} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="md:left-4" />
          <CarouselNext className="md:right-4" />
        </Carousel>
      </div>
      <div className="flex w-full flex-col gap-8">
        <h2 className="text-2xl font-semibold">Buku Berdasarkan Kategori</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {categories.data.map((category) => (
              <CarouselItem
                key={category.name}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <CategoryCard {...category} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-6" />
          <CarouselNext className="-right-6" />
        </Carousel>
      </div>
      <BookSection href="/books" title="Rekomendasi Untukmu">
        {books.data.slice(3, 8).map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </BookSection>
      <BookSection href="/books" title="Buku-Buku Terbaru">
        {newBooks.data.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </BookSection>
      <BookSection href="/books" title="Buku-Buku Terpopuler">
        {books.data.slice(8, 13).map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </BookSection>
    </div>
  );
}
