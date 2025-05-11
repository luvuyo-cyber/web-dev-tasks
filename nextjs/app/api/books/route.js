// Import the book data from the local JSON file
// import books from "./data.json";

// Import the Prisma client instance
import { prisma } from "../../db";

// Import NextResponse from next/server to return JSON responses easily
import { NextResponse } from "next/server";

export async function GET(req) {
  // Use prisma.book.findMany() to retrieve all records from the 'Book' table
  const books = await prisma.book.findMany();

  // Keep the log for verification
  console.log("GET books called");

  // Return the retrieved books as a JSON response
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
  books.push(newBook);

  // 4. Return a success response
  // NextResponse.json() can also send simple messages
  return NextResponse.json(
    { message: "Book added succesfully", book: newBook },
    { status: 201 }
  );
}

//Define an asynchronous function to handle DELETE requests to /api/books ---
//This handler expects the book ID to be passed in the request body
export async function DELETE(req) {
  // 1. Read the request body to get the ID of the book to delete
  const { id } = await req.json();

  // 2. Find the index of the book with the given ID in the array
  // Note: findIndex returns -1 if the element is not found
  const index = books.findIndex((book) => book.id === id);

  // 3. Check if the book was found
  if (index === -1) {
    // If the book was not found, return a 404 Not Found response
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  // 4. Remove the book from the array using splice
  // splice(startIndex, deleteCount)
  books.splice(index, 1);

  // 5. Return a success response
  return NextResponse.json(
    { message: "Book deleted successfully", id: id },
    { status: 200 }
  );
}
