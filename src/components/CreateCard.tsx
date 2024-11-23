// React imports
import React, { useState } from "react";

// React icons import
import { IoClose } from "react-icons/io5";
import { GoPlus } from "react-icons/go";

// React Components import
import Button from "./buttons/Button";
import { useBoard } from "../context/BoardContext";

interface Props {
  columnId: string;
}

const CreateCard: React.FC<Props> = ({ columnId }) => {
  const { addCard } = useBoard();

  const [task, setTask] = useState<string>("");
  const [isShow, setIsShow] = useState<boolean>(false);

  const createTask = () => {
    if (!task.trim()) {
      setIsShow((prev) => !prev);
      return;
    }
    addCard(columnId, task.trim());
    setTask("");
    setIsShow((prev) => !prev);
  };

  const closeTask = () => {
    setTask("");
    setIsShow((prev) => !prev);
  };

  return (
    <div>
      <div className="flex flex-col">
        {isShow && (
          <div>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900"
              name=""
              id=""
              cols={30}
              rows={2}
              placeholder="Enter Card Title..."
            ></textarea>
            <div className="flex p-1">
              <button
                onClick={() => createTask()}
                className="p-1 rounded bg-sky-600 text-white mr-2"
              >
                Add Card
              </button>
              <Button
                icon={<IoClose />}
                onClick={() => closeTask()}
                className=" px-1 py-1"
              />
            </div>
          </div>
        )}
        {!isShow && (
          <Button
            icon={<GoPlus />}
            onClick={() => setIsShow(!isShow)}
            label="Add a card"
            className="flex px-1 py-1 w-full justify-start rounded items-center mt-1 hover:bg-gray-800 h-8"
          />
        )}
      </div>
    </div>
  );
};

export default CreateCard;
