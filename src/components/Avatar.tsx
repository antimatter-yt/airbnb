"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";

interface currentUserProps{
  currentUser?: User | null
}
export const AvatarPage:React.FC<currentUserProps> = ({currentUser}) => {
  return (
    <div>
      <Avatar style={{ width: '30px', height: '30px' }}>
        <AvatarImage sizes="" src={`${currentUser?.image}`} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};
