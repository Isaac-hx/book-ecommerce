export type Stock = {
  id: number;
  quantity: number;
  title: string;
};

export type GetStocksResponse = {
  data: Stock[];
};

export type GetStockByIdResponse = {
  data: Stock;
};

export type CreateStockPayload = {
  quantity: number;
  book_id: number;
};

export type UpdateStockPayload = Omit<CreateStockPayload, "book_id"> & { id: string };