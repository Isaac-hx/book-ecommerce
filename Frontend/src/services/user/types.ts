export type User = {
  id: number;
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  email: string;
  password: string;
  role: string;
  orders: any;
  first_name: string;
  last_name: string;
  avatar_url: string;
  status: "active" | "blocked";
};

export type GetUsersResponse = {
  data: User[];
};

export type GetUserByIdResponse = {
  data: {
    id: number;
    avatar_url: string;
    email: string;
    first_name: string;
    last_name: string;
    address: string;
    created_at: string;
    status: "active" | "blocked";
  };
};

export type UpdateUserPayload = {
  id: string;
  avatar_url: string;
  first_name: string;
  last_name: string;
  address: string;
};
