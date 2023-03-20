export interface SingUpData {
  name: string;
  login: string;
  password: string;
}
export interface LoginData {
  login: string;
  password: string;
}
export interface LoginResponse {
  token: string;
}
export interface UserData {
  name: string;
  login: string;
  _id: string;
}
export interface Token {
  token: string;
}
