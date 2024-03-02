import { NextResponse } from "next/server";
import { schema } from "@/type";
import { db } from "@/lib/db";

export async function POST (request: Request) {
  try {
    const body = await request.json();

    console.log(body)

    const {name, age} = schema.parse(body)

    const newUser = await db.user.create({
      data: {
        name,
        age
      }
    });

    return NextResponse.json({user: newUser, message: "User created successfully"}, {status: 201})
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong"
    }, {status: 500 })
  }
}