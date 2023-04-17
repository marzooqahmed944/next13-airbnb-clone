"use client";

import { AiOutlineMenu } from "react-icons/ai";

const UserMenu = () => {
  const handleClick = () => {};
  const handleClick2 = () => {};

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={handleClick}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          {" "}
          AirBnB your home
        </div>
      </div>
      <div
        onClick={handleClick2}
        className="flex cursor-pointer flex-row  items-center gap-3 rounded-full border-[1px] p-4 transition hover:shadow-md md:px-2 md:py-1 "
      >
        <AiOutlineMenu />
      </div>
    </div>
  );
};

export default UserMenu;
