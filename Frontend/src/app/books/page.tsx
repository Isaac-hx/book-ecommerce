"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { BookCard } from "@/components/molecules";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { axiosInstance } from "@/lib/api";
import { Book, GetBooksResponse } from "@/services/books/types";

export default function BooksPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 0;
  const [page, setPage] = useState(currentPage);

  const { data, isLoading, isError, error } = useQuery<GetBooksResponse>({
    queryKey: ["books", { page_index: currentPage }],
    queryFn: async () => {
      const response = await axiosInstance.get<GetBooksResponse>("/books", {
        params: {
          page_index: currentPage,
        },
      });
      return response.data;
    },
  });

  const handlePageChange = (page: number) => {
    setPage(page);
    router.replace(`${pathname}?page_index=${page}`);
  };

  console.log(data);

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center gap-12 p-12">
      <div>
        <p>Menampilkan {data?.total_data} buku</p>
      </div>
      <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data?.data.map((book) => (
          <BookCard key={book.id} {...book} author="Author Name" />
        ))}
      </div>
      {/* TODO: Implement pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
