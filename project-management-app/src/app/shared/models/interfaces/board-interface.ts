export interface Board {
  title: string;
  owner: string | null;
  users: string[];
}
export interface AddBoardEvent {
  clicked: string;
  value: Board;
}
