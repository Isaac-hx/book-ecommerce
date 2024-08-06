import { BookCard } from "@/components/molecules";
import { books } from "@/lib/dummyData";

// TODO: implement landing page
export default function Home() {
  return (
    <div className="container flex min-h-screen flex-col items-center p-12">
      <div className="flex gap-4">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </div>
    </div>
  );
}
