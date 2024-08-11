import { Book } from "../books/types";
import { User } from "../user/types";

export type CartItem = {
  id: string;
  book_id: number;
  quantity: number;
  User: User;
  Book: Book;
};

export type Cart = {
  data: CartItem[];
};

export type CreateCartPayload = {
  book_id: number;
  quantity: number;
};

export type UpdateCartPayload = CreateCartPayload;

export type DeleteCartPayload = {
  book_id: string;
};

export type CreateCartResponse = {
  message: string;
};
