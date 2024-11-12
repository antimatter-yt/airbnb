import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify } from "lucide-react";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps{
  currentUser? : User | null
}
const DropPage:React.FC<UserMenuProps>  = ({currentUser}) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  return (
    <div>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <AlignJustify />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      {currentUser ? (
        <>
          <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>{}}>My trips</DropdownMenuItem>
        <DropdownMenuItem onClick={()=>{}}>My favorites</DropdownMenuItem>
        <DropdownMenuItem onClick={()=>{}}>My reservations</DropdownMenuItem>
        <DropdownMenuItem onClick={()=>{}}>My properties</DropdownMenuItem>
        <DropdownMenuItem onClick={()=>{}}>Airbnb my home</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>signOut()}>Logout</DropdownMenuItem>
        </>
      ) : (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={loginModal.onOpen}>Log in</DropdownMenuItem>
          <DropdownMenuItem onClick={registerModal.onOpen}>Sign up</DropdownMenuItem>
        </>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
</div>

  );
};

export default DropPage;
