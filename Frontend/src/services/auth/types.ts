export type AuthRegisterPayload = {
  email: string;
  password: string;
};

export type AuthRegisterResponse = {
  message: string;
};

export type AuthRegisterErrorResponse = {
  error: string;
};
