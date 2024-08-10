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

export type AuthLoginPayload = {
  email: string;
  password: string;
};

export type AuthLoginResponse = {
  message: string;
  token: string;
  role: string;
};

export type AuthLoginErrorResponse = {
  error: string;
};

export type RoleAvailable = "admin" | "user";

export type ChangePasswordPayload = {
  password: string;
  new_password: string;
};

export type ChangePasswordResponse = {
  message: string;
};

export type ChangePasswordErrorResponse = {
  error: string;
};
