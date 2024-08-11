export type OrderStatus = "pending" | "paid" | "rejected";

export type Order = {
  order_id: number;
  status_order: OrderStatus;
  proof_payment: string;
  payment_method_id: number;
  payment_method_name: string;
  total_price: number;
};

export type OrderDetailItem = {
  book_id: number;
  subtotal: number;
  quantity: number;
  price_total_book: number;
  cover_url: string;
  title: string;
  price_per_book: number;
};

export type GetOrdersResponse = {
  data: Order[];
};

export type GetOrderByIdResponse = {
  data: {
    order_id: number;
    status_order: string;
    proof_payment: string;
    payment_method_id: number;
    payment_method_name: string;
    payment_holder_name: string;
    payment_holder_number: string;
    total_price: number;
    first_name: string;
    last_name: string;
    address: string;
    email_address: string;
    list_order_book: OrderDetailItem[];
  };
};

export type UpdateOrderPayload = {
  id: string;
  status_order: OrderStatus;
};

export type CreateOrderPayload = {
  payment_method_id: number;
  orders: {
    book_id: number;
    quantity: number;
  }[];
};
