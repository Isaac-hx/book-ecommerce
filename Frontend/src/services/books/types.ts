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
  publisher_id: number;
};

export type GetBooksResponse = {
  data: {
    id: number;
    title: "string";
    author_name: string;
    price: number;
    cover_url: string;
  }[];
  current_page: number;
  page_size: number;
  total_data: number;
  total_pages: number;
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
