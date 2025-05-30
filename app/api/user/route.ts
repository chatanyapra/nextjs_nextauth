// import { NextResponse } from "next/server";
// import { hash } from "bcrypt";
// import db from "../../../lib/prisma";

// export async function GET() {
//     return NextResponse.json({ message: "Hello from the user API" });
// }

// export async function POST(req: Request) {
//     const body = await req.json();
//     const { username, email, password } = body;
//     console.log("Received data:", body);
//     // check if the email is already exist
//     if (!username || !email || !password) {
//         return NextResponse.json({
//             error: "All fields are required"
//         }, { status: 400 });
//     }

//     const emailExists = await db.user.findUnique({
//         where: {
//             email: email,
//         }
//     })
//     const usernameExists = await db.user.findUnique({
//         where: {
//             username: username,
//         }
//     })

//     if(emailExists) {
//         return NextResponse.json({message: "Email already exists"}, { status: 409});
//     }
//     if(usernameExists) {
//         return NextResponse.json({message: "Username already exists"}, { status: 409});
//     }
//     const hashedpassword = await hash(password,10);
//     const newUser = await db.user.create({
//         data:{
//             username: username,
//             email: email,
//             password: hashedpassword,    
//         }
//     })
//     const {password: newpassword, ...userWithoutPassword} = newUser;

//     return NextResponse.json({user: userWithoutPassword, message: "User created successfully"}, { status: 201 });
// }