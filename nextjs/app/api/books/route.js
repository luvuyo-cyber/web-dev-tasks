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
  // We expect title, link, and img from the frontend
  const { title, link, img } = await req.json();

  // 2. Use Prisma Client to create a new book record in the database
  try {
    const newBook = await prisma.book.create({
      data: {
        // The 'data' object contains the fields to be inserted
        title: title,
        link: link,
        img: img,
        // Prisma will automatically generate the 'id', 'createdAt', and 'updatedAt'
      },
    });

    console.log("POST book created:", newBook);

    // 3. Return a success response with the created book data
    return NextResponse.json(
      { message: "Book added successfully", book: newBook },
      { status: 201 }
    );
  } catch (error) {
    // Handle potential errors during database insertion
    console.error("Error creating book in Prisma:", error);

    // Return an error response
    return NextResponse.json(
      { message: "Failed to add book", error: error.message },
      { status: 500 }
    );
  }
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
