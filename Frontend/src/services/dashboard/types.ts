export type OrderHistory = {
  date: string;
  total_price_order: number;
};

export type GetOrderHistoriesParams = {
  filterby: "date" | "month" | "year";
};

export type GetOrderHistoriesResponse = {
  data: OrderHistory[];
};

export type GetOrderSummaryResponse = {
  data: {
    total_order: string;
  };
};

export type GetBookSummaryResponse = {
  data: {
    total_books: string;
  };
};

export type GetAuthorSummaryResponse = {
  data: {
    total_authors: string;
  };
};

export type GetPublisherSummaryResponse = {
  data: {
    total_publisher: string;
  };
};
