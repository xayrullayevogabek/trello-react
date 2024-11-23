// React Imports
import React, { useState } from "react";

// React Icons Imports
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  return (
    <div
      className={` transition-all linear duration-500 flex-shrink-0 ${
        isCollapsed ? "w-[40px]" : "w-[280px]"
      } bg-[#121417] h-[calc(100vh-3.6rem)] border-r border-r-[#9fadbc29] `}
    >
      {isCollapsed ? (
        <div className="px-2 py-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-slate-600 rounded-sm"
          >
            <MdChevronRight size={20} />
          </button>
        </div>
      ) : (
        <div>
          <div className="px-3 py-5 flex justify-between border-b border-b-[#9fadbc29]">
            <h1 className=" text-md font-semibold">WorkSpace</h1>
            <button
              className="hover:bg-slate-600 rounded-sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <MdChevronLeft size={20} />
            </button>
          </div>

          <div>
            <div className=" flex items-center justify-between px-3 py-5">
              <h1 className=" font-semibold">Your Boards</h1>
            </div>

            <ul className=" w-full">
              <li className=" w-full cursor-pointer p-3 bg-[#5C6063] flex items-center gap-3">
                <div className=" w-10 h-7 bg-[#333] rounded-md" />
                Kanban Board
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
