import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    const body = await req.json();
    const { username, email, password } = body;
    // check if the email is already exist
    if (!username || !email || !password) {
        return NextResponse.json({
            error: "All fields are required"
        }, { status: 400 });
    }

    const emailExists = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
    const usernameExists = await prisma.user.findUnique({
        where: {
            username: username,
        }
    })

    if(emailExists) {
        return NextResponse.json({message: "Email already exists"}, { status: 409});
    }
    if(usernameExists) {
        return NextResponse.json({message: "Username already exists"}, { status: 409});
    }
    const hashedpassword = await hash(password,10);
    const newUser = await prisma.user.create({
        data:{
            username: username,
            email: email,
            password: hashedpassword,    
        }
    })
    const {password: newpassword, ...userWithoutPassword} = newUser;

    return NextResponse.json({user: userWithoutPassword, message: "User created successfully"}, { status: 201 });
}
