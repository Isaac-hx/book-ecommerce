export type Author = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
  Books: null;
};

export type GetAuthorsResponse = {
  data: Author[];
};

export type GetAuthorByIdResponse = {
  data: Author;
};

export type CreateAuthorPayload = {
  name: string;
};

export type UpdateAuthorPayload = CreateAuthorPayload & { id: string };
