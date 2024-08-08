import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export const BookSkeleton = () => {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex max-h-[445px] w-full max-w-[230px] flex-col items-center gap-4 rounded-lg"
        >
          <Skeleton className="h-[290px] w-full p-8" />
          <div className="flex flex-col items-center gap-y-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <Skeleton className="h-4 w-[150px]" />
        </div>
      ))}
    </div>
  );
};
