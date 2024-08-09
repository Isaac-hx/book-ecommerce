export type PaymentMethod = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
  account_number: string;
  account_holder_name: string;
  orders: null;
};

export type GetPaymentMethodsResponse = {
  data: PaymentMethod[];
};

export type GetPaymentMethodByIdResponse = {
  data: PaymentMethod;
};

export type CreatePaymentMethodPayload = {
  name: string;
  account_number: string;
  account_holder_name: string;
};

export type UpdatePaymentMethodPayload = CreatePaymentMethodPayload & {
  id: string;
};
