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
  id: string;
  name: string;
  login: string;
}
