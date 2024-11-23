// React Imports
import React, { useState } from "react";

// React Icons Imports
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";

// Component imports
import Button from "./buttons/Button";
import { useBoard } from "../context/BoardContext";

const CreateColumn: React.FC = () => {
  const { addColumn } = useBoard();

  const [title, setTitle] = useState("");
  const [isShow, setIsShow] = useState(false);

  const saveList = () => {
    if (!title.trim()) {
      return;
    }
    addColumn(title);
    setTitle("");
    setIsShow((prev) => !prev);
  };

  const closeBtn = () => {
    setTitle("");
    setIsShow((prev) => !prev);
  };

  return (
    <div>
      <div
        className={`flex flex-col h-fit flex-shrink-0 mr-3 w-60 rounded-lg p-2 ${
          isShow ? "bg-black" : "bg-white/30 text-white"
        }`}
      >
        {isShow && (
          <div>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900"
              name=""
              id=""
              cols={30}
              rows={2}
              placeholder="Enter list Title..."
            ></textarea>
            <div className="flex p-1">
              <Button
                onClick={() => saveList()}
                label="Add list"
                className="px-1 py-1 rounded bg-sky-600 hover:bg-sky-600 text-black mr-2"
              />
              <Button
                icon={<IoClose />}
                onClick={() => closeBtn()}
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
            className="flex w-full justify-start rounded items-center hover:bg-transparent"
          />
        )}
      </div>
    </div>
  );
};

export default CreateColumn;
