import React from "react";
import { Search } from "lucide-react";

export const SearchPage = () => {
  return (
    <div
      className="
    border-[1px]
    w-full
    md:w-auto
    py-2 
    rounded-full
    hover:shadow-full
    transition
    cursor-pointer
    "
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div
          className="hidden sm:block text-sm font-semibold px-6 border-x-[1px]
        flex-2 text-center"
        >
          Any Week
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden sm:block">Add Guests</div>
            <div className="p-2 bg-rose-500 rounded-full text-white">
                <Search size={14} />
            </div>
        </div>
      </div>
    </div>
  );
};
