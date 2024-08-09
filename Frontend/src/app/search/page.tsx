import { BookCard } from "@/components/molecules";
import { GetBooksResponse } from "@/services/book/types";
import React from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { title: string };
}) {
  const data = await getBooks({ searchParams });

  return (
    <div className="container flex flex-col gap-12 p-12">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <p>
          Menampilkan total {data?.total_data} dari hasil pencarian buku dengan
          kata kunci <span className="font-bold">"{searchParams.title}"</span>
        </p>
      </div>
      <div className="mx-auto grid min-h-screen w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data?.data.map((book) => <BookCard key={book.id} {...book} />)}
      </div>
    </div>
  );
}

const getBooks = async ({
  searchParams,
}: {
  searchParams: { title: string };
}): Promise<GetBooksResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/books?title=${searchParams.title}&limit=100`,
  );
  return response.json();
};
