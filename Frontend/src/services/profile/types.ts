export type Profile = {
  ID: number;
  user_id: number;
  first_name: string;
  last_name: string;
  avatar_url: string;
  phone: string;
  address: string;
};

export type GetProfileByIdResponse = {
  data: Profile;
};

export type UpdateProfilePayload = {
  id: number;
  first_name: string;
  last_name: string;
  avatar_url: string;
  phone: string;
  address: string;
};
