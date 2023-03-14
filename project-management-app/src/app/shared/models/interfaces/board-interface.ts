export interface OneBoard {
  id: string;
  title: string;
  description: string;
}

export type AllBoardsResponse = Array<OneBoard>;
