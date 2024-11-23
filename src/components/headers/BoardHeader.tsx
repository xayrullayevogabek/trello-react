// React Imports
import React from "react";

// React Icons import
import { CiStar } from "react-icons/ci";
import { PiUsers } from "react-icons/pi";
import { MdOutlineBarChart } from "react-icons/md";
import { IoChevronDown, IoRocketOutline, IoFilterSharp } from "react-icons/io5";
import { BsLightningChargeFill } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiUserPlus } from "react-icons/fi";

// Import components
import Button from "../buttons/Button";

const BoardHeader: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between p-3 bg-slate-900 w-full">
      <div className="flex items-center gap-5">
        <h1 className="text-xl text-white font-semibold">Kanban Board</h1>
        <div className="flex items-center gap-1">
          <Button
            icon={<CiStar size={20} className="text-white" />}
            className="hover:bg-slate-600 px-1 py-1"
          />
          <Button
            icon={<PiUsers size={20} />}
            className="hover:bg-slate-600 px-1 py-1"
          />
          <div className="flex items-center gap-1">
            <Button
              icon={<MdOutlineBarChart />}
              label="Board"
              className="text-black bg-white hover:bg-white py-2 px-4"
            />
            <Button
              icon={<IoChevronDown size={21} />}
              className="text-black bg-white hover:bg-white py-2 px-4"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-end mt-5 lg:mt-0">
        <Button icon={<IoRocketOutline />} className="hover:bg-slate-600 p-2" />
        <Button
          icon={<BsLightningChargeFill />}
          className="hover:bg-slate-600 p-2"
        />
        <Button
          icon={<IoFilterSharp />}
          label="Filters"
          className="hover:bg-slate-600 p-2"
        />
        <Button
          icon={<FiUserPlus />}
          label="Share"
          className="text-black bg-white hover:bg-white py-2 px-4"
        />
        <Button
          icon={<HiOutlineDotsVertical />}
          className="hover:bg-slate-600 px-2 py-3"
        />
      </div>
    </div>
  );
};

export default BoardHeader;
