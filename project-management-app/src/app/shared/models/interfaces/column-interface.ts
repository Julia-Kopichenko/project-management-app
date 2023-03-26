export interface Column {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}
export interface ColumnBodyForRequest {
  title: string;
  order: number;
}
export interface AddColumnEvent {
  clicked: string;
  value: {
    title: string;
  };
}
