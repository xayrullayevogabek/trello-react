import React, { createContext, useContext, useState, useEffect } from "react";
import { BoardContextType, IBoard, IColumn } from "../types";

// Default initial state
const initialState: IBoard = {
  columns: [
    {
      id: "1",
      title: "To Do",
      cards: [],
    },
    {
      id: "2",
      title: "In Progress",
      cards: [],
    },
    {
      id: "3",
      title: "Done",
      cards: [],
    },
  ],
};

const defaultBoardContext: BoardContextType = {
  board: initialState,
  addColumn: () => {},
  deleteColumn: () => {},
  editColumn: () => {},
  addCard: () => {},
  deleteCard: () => {},
  moveCard: () => {},
  editCard: () => {},
};

// Context
const BoardContext = createContext<BoardContextType>(defaultBoardContext);

// Getting data from localStorage
const getFromLocalStorage = (): IBoard => {
  const data = localStorage.getItem("kanbanBoard");
  return data ? JSON.parse(data) : initialState;
};

// Setting data to localStorage
const saveToLocalStorage = (data: IBoard) => {
  localStorage.setItem("kanbanBoard", JSON.stringify(data));
};

// Provider
export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [board, setBoard] = useState<IBoard>(getFromLocalStorage);

  // Setting data to localStorage when board changes
  useEffect(() => {
    saveToLocalStorage(board);
  }, [board]);

  const addColumn = (title: string) => {
    const newColumn: IColumn = {
      id: Date.now().toString(),
      title,
      cards: [],
    };
    setBoard((prev) => ({
      columns: [...prev.columns, newColumn],
    }));
  };

  const editColumn = (columnId: string, newTitle: string) => {
    setBoard((prev) => ({
      columns: prev.columns.map((column) =>
        column.id === columnId ? { ...column, title: newTitle } : column
      ),
    }));
  };

  const deleteColumn = (columnId: string) => {
    setBoard((prev) => ({
      columns: prev.columns.filter((column) => column.id !== columnId),
    }));
  };

  const addCard = (columnId: string, cardTitle: string) => {
    setBoard((prev) => ({
      columns: prev.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: [
                ...column.cards,
                { id: Date.now().toString(), title: cardTitle },
              ],
            }
          : column
      ),
    }));
  };

  const deleteCard = (columnId: string, cardId: string) => {
    setBoard((prev) => ({
      columns: prev.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.filter((card) => card.id !== cardId),
            }
          : column
      ),
    }));
  };

  const editCard = (columnId: string, cardId: string, newTitle: string) => {
    setBoard((prev) => ({
      columns: prev.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId ? { ...card, title: newTitle } : card
              ),
            }
          : column
      ),
    }));
  };

  const moveCard = (
    sourceColumnId: string,
    destinationColumnId: string,
    cardId: string
  ) => {
    setBoard((prev) => {
      const sourceColumn = prev.columns.find(
        (column) => column.id === sourceColumnId
      );
      const destinationColumn = prev.columns.find(
        (column) => column.id === destinationColumnId
      );

      if (!sourceColumn || !destinationColumn) return prev;

      const cardToMove = sourceColumn.cards.find((card) => card.id === cardId);

      const updatedSourceColumn = {
        ...sourceColumn,
        cards: sourceColumn.cards.filter((card) => card.id !== cardId),
      };

      const updatedDestinationColumn = {
        ...destinationColumn,
        cards: [...destinationColumn.cards, cardToMove!],
      };

      const updatedColumns = prev.columns.map((column) => {
        if (column.id === sourceColumnId) return updatedSourceColumn;
        if (column.id === destinationColumnId) return updatedDestinationColumn;
        return column;
      });

      return { columns: updatedColumns };
    });
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        addColumn,
        deleteColumn,
        addCard,
        deleteCard,
        moveCard,
        editCard,
        editColumn,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

// Hook
export const useBoard = () => useContext(BoardContext);
