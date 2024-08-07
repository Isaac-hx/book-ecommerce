import { BookCard, CategoryCard, Hero } from "@/components/molecules";
import { BookSection } from "@/components/organisms";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { books, categories } from "@/lib/dummyData";
import {
  best_selling,
  new_arrivals,
  recommended_books,
} from "@/lib/dummyData/books.json";

// TODO: implement landing page
export default function Home() {
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
            {books.map((book) => (
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
            {categories.map((book) => (
              <CarouselItem
                key={book.name}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <CategoryCard {...book} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-6" />
          <CarouselNext className="-right-6" />
        </Carousel>
      </div>
      <BookSection href="/books" title="Rekomendasi Untukmu">
        {recommended_books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </BookSection>
      <BookSection href="/books" title="Buku-Buku Terbaru">
        {new_arrivals.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </BookSection>
      <BookSection href="/books" title="Buku-Buku Terpopuler">
        {best_selling.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </BookSection>
    </div>
  );
}
