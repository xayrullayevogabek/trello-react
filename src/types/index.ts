export interface INavigation {
  title: string;
}

export interface ICard {
  id: string;
  title: string;
}

export interface IColumn {
  id: string;
  title: string;
  cards: ICard[];
}

export interface IBoard {
  columns: IColumn[];
}

export interface BoardContextType {
  board: IBoard;
  addColumn: (title: string) => void;
  deleteColumn: (columnId: string) => void;
  editColumn: (columnId: string, newTitle: string) => void;
  addCard: (columnId: string, cardTitle: string) => void;
  deleteCard: (columnId: string, cardId: string) => void;
  moveCard: (
    sourceColumnId: string,
    destinationColumnId: string,
    cardId: string
  ) => void;
  editCard: (columnId: string, cardId: string, newTitle: string) => void;
}
