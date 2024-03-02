import { NextResponse } from "next/server";
import { schema } from "@/type";

export async function POST (request: Request) {
  try {
    const body = await request.json();

    console.log(body)

    const {name, age} = schema.parse(body)

    return NextResponse.json({user: {name, age}, message: "User created successfully"}, {status: 201})
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong"
    }, {status: 500 })
  }
}