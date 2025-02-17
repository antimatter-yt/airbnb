import { prisma } from "@/lib/prismadb";
import { auth } from "../auth"
 
export default async function getCurrentUser() {
 try {
    const session = await auth()
    if(!session?.user?.email){
        return null;
    }
    const currentUser = await prisma.user.findUnique({
        where:{
            email:session.user.email as string
        }
    })
    return currentUser;
 } catch (error) {
    return null;
    console.log(error)
 }
}