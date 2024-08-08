export type Book = {
  id: number;
  title: "string";
  description: "string";
  cover_url: "string";
  price: number;
  total_pages: number;
  weight: number;
  height: number;
  language: string;
  published_date: Date;
  author_id: number;
  publisher: number;
};

export type GetBooksResponse = {
  data: Book[];
  number_of_pages: number;
  page_index: number;
  total_data: number;
};

export type GetBookByIdResponse = {
  data: Book;
};

export type CreateBookPayload = {
  title: "string";
  description: "string";
  cover_url: "string";
  price: number;
  total_pages: number;
  weight: number;
  height: number;
  language: string;
  published_date: Date;
  author_id: number;
  publisher_id: number;
  category_ids: number[];
};

export type UpdateBookPayload = CreateBookPayload & { id: number };
