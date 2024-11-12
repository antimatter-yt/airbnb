"use client"
import React from "react";
import { Container } from "../Container";
import { Logo } from "./Logo";
import { SearchPage } from "./Search";
import { UserMenu } from "./UserMenu";
import { User } from "@prisma/client";
import { Categories } from "./Categories";

interface UserMenuProps{
  currentUser? : User | null
}
export const Navbar:React.FC<UserMenuProps>  = ({currentUser}) => {
 
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-2 border-b-[1px]">
        <Container>
          <div
            className="
            flex 
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
            "
          >
            <Logo/>
            <SearchPage/>
            <UserMenu currentUser={currentUser}  />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};
