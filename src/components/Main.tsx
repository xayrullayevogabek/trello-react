// React Imports
import React from "react";

// Component imports
import BoardHeader from "./headers/BoardHeader";
import Column from "./Column";

// Custom hooks
import { useBoard } from "../context/BoardContext";

// Drag and drop Context
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import CreateColumn from "./CreateColumn";

const Main: React.FC = () => {
  const { board, moveCard } = useBoard();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      moveCard(source.droppableId, destination.droppableId, result.draggableId);
    }
  };

  return (
    <div className=" flex flex-col w-full">
      <BoardHeader />

      <div className="flex flex-col w-full flex-grow relative">
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-auto overflow-y-hidden">
          <DragDropContext onDragEnd={onDragEnd}>
            {board.columns.map((column, indx) => (
              <Column column={column} key={indx} />
            ))}
          </DragDropContext>
          <CreateColumn />
        </div>
      </div>
    </div>
  );
};

export default Main;
