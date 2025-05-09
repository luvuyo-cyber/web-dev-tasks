// Import the book data from the local JSON file
import books from "./data.json";

// Import NextResponse from next/server to return JSON responses easily
import { NextResponse } from "next/server";

export async function GET(req) {
  // Return the 'books' array as a JSON response
  return NextResponse.json(books);
}
//Define an asynchronous function to handle POST requests to /api/books
export async function POST(req) {
  // 1. Read the request body as JSON
  // The request object has a .json() method to parse the body
  const { title, link, img } = await req.json();

  // 2. Create a new book object
  // For now, generate a simple ID based on the array length
  const newBook = {
    id: books.length + 1,
    title,
    link,
    img,
  };

  // 3. Add the new book to the in-memory array
  // Note: This only adds to the array in the current server process's memory.
  // It will be lost when the server restarts or if multiple server instances are running.
  books.push(newBook);

  // 4. Return a success response
  // NextResponse.json() can also send simple messages
  return NextResponse.json(
    { message: "Book added succesfully", book: newBook },
    { status: 201 }
  );
}
