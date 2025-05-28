import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "Hello, World! get request received from project route"
    });
}

// export async function POST(req: Request){
//     try{
//         const body = await req.json();
//         const {email, username, password} = body;
//         return NextResponse.json({
//             message: "Hello, World! post request received from project route",
//             data: body
//         });
//     }catch (error) {
//         return NextResponse.json({
//             message: "Error processing request",
//             error: error instanceof Error ? error.message : "Unknown error"
//         }, { status: 500 });
//     }
// }