import books from "./data.json";
import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json(books);
}
