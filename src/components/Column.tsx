// React imports
import React, { useRef, useState } from "react";

// React Icons Imports
import { MdEdit, MdDelete, MdSave } from "react-icons/md";

// Interfaces
import { IColumn } from "../types";

// Components
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useBoard } from "../context/BoardContext";
import Button from "./buttons/Button";
import CreateCard from "./CreateCard";

interface Props {
  column: IColumn;
}

const Column = ({ column }: Props) => {
  const { deleteCard, editCard, deleteColumn, editColumn } = useBoard();

  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [newCardTitle, setNewCardTitle] = useState<string>("");
  const [isEditingColumn, setIsEditingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(column.title);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickEditCard = (cardId: string, cardTitle: string) => {
    setEditingCardId(cardId);
    setNewCardTitle(cardTitle);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSaveCard = (cardId: string) => {
    if (newCardTitle.trim()) {
      editCard(column.id, cardId, newCardTitle);
      setEditingCardId(null);
    }
  };

  const handleEditColumn = () => {
    setIsEditingColumn(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSaveColumn = () => {
    if (newColumnTitle.trim()) {
      editColumn(column.id, newColumnTitle);
      setIsEditingColumn(false);
    }
  };

  return (
    <div className="mr-3 w-72 h-fit rounded-md p-2 bg-black flex-shrink-0">
      <div>
        <div className="flex justify-between p-1 items-center">
          {isEditingColumn ? (
            <div className="flex items-center w-full">
              <input
                ref={inputRef}
                type="text"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveColumn();
                  }
                }}
                className="bg-transparent text-white border-none focus:outline-none flex-grow"
              />
              <Button
                icon={<MdSave />}
                className="hover:bg-gray-600 px-1 py-1 rounded-sm"
                onClick={handleSaveColumn}
              />
            </div>
          ) : (
            <>
              <span>{column.title}</span>
              <div className="flex space-x-1">
                <Button
                  icon={<MdEdit />}
                  className="hover:bg-gray-600 px-1 py-1 rounded-sm"
                  onClick={handleEditColumn}
                />
                <Button
                  icon={<MdDelete />}
                  className="hover:bg-gray-600 px-1 py-1 rounded-sm"
                  onClick={() => deleteColumn(column.id)}
                />
              </div>
            </>
          )}
        </div>

        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              className="py-1"
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver
                  ? "#222"
                  : "transparent",
                borderRadius: snapshot.isDraggingOver ? "5px" : "0px",
              }}
              {...provided.droppableProps}
            >
              {column.cards &&
                column.cards.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="item flex justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500">
                          {editingCardId === item.id ? (
                            <div className="flex items-center">
                              <input
                                ref={inputRef}
                                type="text"
                                value={newCardTitle}
                                onChange={(e) =>
                                  setNewCardTitle(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleSaveCard(item.id);
                                  }
                                }}
                                className="bg-transparent text-white border-none focus:outline-none"
                              />
                            </div>
                          ) : (
                            <span>{item.title}</span>
                          )}

                          <span className="flex justify-start items-start">
                            <Button
                              icon={<MdEdit />}
                              className="hover:bg-gray-600 px-1 py-1 rounded-sm"
                              onClick={() =>
                                handleClickEditCard(item.id, item.title)
                              }
                            />
                            <Button
                              icon={<MdDelete />}
                              className="hover:bg-gray-600 px-1 py-1 rounded-sm"
                              onClick={() => deleteCard(column.id, item.id)}
                            />
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <CreateCard columnId={column.id} />
      </div>
    </div>
  );
};

export default Column;
