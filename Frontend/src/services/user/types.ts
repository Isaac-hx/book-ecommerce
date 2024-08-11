export type User = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  email: string;
  password: string;
  role: string;
  orders: any;
};
