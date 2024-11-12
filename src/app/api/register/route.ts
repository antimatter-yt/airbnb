import { prisma } from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, name, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });
  return NextResponse.json(user);
}
