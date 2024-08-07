export type Publisher = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
  Books: null;
};

export type GetPublishersResponse = {
  data: Publisher[];
};

export type GetPublisherByIdResponse = {
  data: Publisher;
};

export type CreatePublisherPayload = {
  name: string;
};

export type UpdatePublisherPayload = CreatePublisherPayload & { id: string };
