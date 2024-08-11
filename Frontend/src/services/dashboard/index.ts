import { AxiosResponse } from "axios";

import { axiosInstance } from "@/lib/api";

import type {
  GetAuthorSummaryResponse,
  GetBookSummaryResponse,
  GetOrderHistoriesParams,
  GetOrderHistoriesResponse,
  GetOrderSummaryResponse,
  GetPublisherSummaryResponse,
} from "./types";

export const getOrderHistories = (params: GetOrderHistoriesParams) => {
  return axiosInstance.get<GetOrderHistoriesResponse>(
    "/summary/history-order",
    { params },
  );
};

export const getResourceSummaries = async () => {
  const toInt = (value: string) => {
    return Number.isNaN(parseInt(value)) ? 0 : parseInt(value);
  };

  const responses = await Promise.all([
    axiosInstance.get<GetOrderSummaryResponse>("/summary/order"),
    axiosInstance.get<GetBookSummaryResponse>("/summary/book"),
    axiosInstance.get<GetAuthorSummaryResponse>("/summary/author"),
    axiosInstance.get<GetPublisherSummaryResponse>("/summary/publisher"),
  ]);

  const total_order = responses[0].data.data.total_order;
  const total_books = responses[1].data.data.total_books;
  const total_authors = responses[2].data.data.total_authors;
  const total_publisher = responses[3].data.data.total_publisher;

  return {
    total_order: toInt(total_order),
    total_books: toInt(total_books),
    total_authors: toInt(total_authors),
    total_publisher: toInt(total_publisher),
  } satisfies Record<
    keyof (GetOrderSummaryResponse["data"] &
      GetBookSummaryResponse["data"] &
      GetAuthorSummaryResponse["data"] &
      GetPublisherSummaryResponse["data"]),
    number
  >;
};
