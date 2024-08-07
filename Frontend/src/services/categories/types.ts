export type Category = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
  Books: null;
};

export type GetCategoriesResponse = {
  data: Category[];
};

export type GetCategoryByIdResponse = {
  data: Category;
};

export type CreateCategoryPayload = {
  name: string;
};

export type UpdateCategoryPayload = CreateCategoryPayload & { id: string };
