export interface Board {
  id?: string;
  title: string;
  description?: string;
}

export type AllBoardsResponse = Array<Board>;
