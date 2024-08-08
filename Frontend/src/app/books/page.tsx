"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { BookCard } from "@/components/molecules";
import { BookSkeleton } from "@/components/molecules/BookSkeleton";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/api";
import { GetBooksResponse } from "@/services/books/types";

export default function BooksPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 0;
  const [page, setPage] = useState(currentPage);

  const { data, isLoading } = useQuery<GetBooksResponse>({
    queryKey: ["books", { page_index: currentPage }],
    queryFn: async () => {
      const response = await axiosInstance.get<GetBooksResponse>("/books", {
        params: {
          page_index: currentPage - 1,
        },
      });
      return response.data;
    },
  });

  const handlePageChange = (page: number) => {
    setPage(page);
    router.replace(`${pathname}?page=${page}`);
  };

  return (
    <div className="container flex min-h-screen flex-col gap-12 p-12">
      <div>
        <p>
          Menampilkan {data?.data.length} dari total {data?.total_data} buku
        </p>
      </div>
      {isLoading && <BookSkeleton />}
      <div className="mx-auto grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data?.data.map((book) => <BookCard key={book.id} {...book} />)}
      </div>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <p>
          Menampilkan {data?.data.length} dari total {data?.total_data} buku
        </p>
        <div className="my-4 flex gap-x-3">
          <Button
            className={`flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50`}
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            size={"icon"}
          >
            <ChevronLeft />
          </Button>
          <div className="flex items-center">
            <p>
              {page} / {data?.total_pages}
            </p>
          </div>
          <Button
            className={`flex items-center justify-center`}
            disabled={page === data?.total_pages}
            onClick={() => handlePageChange(page + 1)}
            size={"icon"}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
