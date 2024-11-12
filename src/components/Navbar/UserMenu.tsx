"use client";
import React, { useCallback } from "react";
import {  AvatarPage } from "../Avatar";
import DropPage from "./Drop";
import { User } from "@prisma/client";
import useLoginModal from "@/hooks/useLoginModal";


interface currentUserProps{
  currentUser?: User | null
}
export const UserMenu:React.FC<currentUserProps> = ({currentUser}) => {
  const loginModal = useLoginModal()
  const handleAirbnbClick = useCallback(() => {
    if(!currentUser){
      return loginModal.onOpen()
    }
  },[currentUser, loginModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={handleAirbnbClick}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div
          className="p-3 md:py-1
        md:px-2 border-[1px] border-neutral-200
         flex items-center justify-center gap-2 rounded-full
        cursor-pointer hover:shadow-md transition"
        >
         <div>
         <DropPage currentUser={currentUser}  />
         </div>
          <div className="hidden md:block">
            <AvatarPage currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};
