export interface BoardBodyForRequest {
  title: string;
  owner: string | null;
  users: string[];
}
export interface Board {
  _id: string;
  title: string;
  owner: string | null;
  users: string[];
}
export interface AddBoardEvent {
  clicked: string;
  value: Board;
}
