// Import the book data from the local JSON file
import books from "./data.json";

// Import NextResponse from next/server to return JSON responses easily
import { NextResponse } from "next/server";

export async function GET(req) {
  // Return the 'books' array as a JSON response
  return NextResponse.json(books);
}
