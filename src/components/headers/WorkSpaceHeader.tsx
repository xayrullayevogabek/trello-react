// React Imports
import React from "react";

// Icons import
import { IoChevronDown } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import {
  IoMdNotificationsOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

// Constants
import { navigations } from "../../constants";

const WorkSpaceHeader: React.FC = () => {
  return (
    <div className=" bg-[#1D2125] w-full h-12 py-7 px-5 flex flex-row items-center justify-between border-b border-b-[#31383D]">
      <div className=" h-full flex items-center gap-8">
        <img
          src="https://trello.com/assets/d947df93bc055849898e.gif"
          alt="trello-icon"
          className=" w-20 h-10 object-contain"
        />

        <ul className=" hidden lg:flex items-center h-full gap-10">
          {navigations.map((navigation, index) => (
            <li
              key={index}
              className=" font-semibold cursor-pointer flex items-center gap-1"
            >
              {navigation.title} <IoChevronDown />
            </li>
          ))}
        </ul>
        <button className=" hidden lg:block py-2 px-4 bg-[#579DFF] text-black rounded-md">
          Create
        </button>
      </div>
      <div className=" flex items-center gap-3 bg-[#1d2125]">
        <div className=" flex items-center gap-2 p-2 border border-[#738496] rounded-md">
          <CiSearch />
          <input
            type="text"
            placeholder="Search"
            className=" bg-transparent focus:border-none outline-none"
          />
        </div>

        <IoMdNotificationsOutline size={20} className=" rotate-45" />
        <IoIosInformationCircleOutline size={20} />
        <RxAvatar size={20} />
      </div>
    </div>
  );
};

export default WorkSpaceHeader;
