export type Book = {
  id: number;
  title: string;
  author_name: string;
  price: number;
  cover_url: string;
  quantity: number;
  description: string;
};

export type GetAllBookParams = Partial<{
  page_index: number;
  limit: number;
  order_by: string;
  sort_by: string;
  title: string;
}>;

export type GetBooksResponse = {
  data: Book[];
  current_page: number;
  page_size: number;
  total_data: number;
  total_pages: number;
};

export type GetBookByIdResponse = {
  data: {
    title: string;
    description: string;
    cover_url: string;
    total_pages: number;
    weight: number;
    width: number;
    height: number;
    language: string;
    published_date: string;
    price: number;
    author_name: string;
    publisher_name: string;
    quantity: number;
    category: Array<{
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: string | null;
      name: string;
      Books: null;
    }>;
  };
};

export type CreateBookPayload = {
  title: string;
  description: string;
  cover_url: string;
  total_pages: number;
  weight: number;
  width: number;
  height: number;
  language: string;
  published_date: string;
  price: number;
  author_id: number;
  publisher_id: number;
  category_ids: number[];
};

export type UpdateBookPayload = CreateBookPayload & { id: string };
