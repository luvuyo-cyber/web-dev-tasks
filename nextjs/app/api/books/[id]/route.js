// This file defines the API route handler for dynamic book routes like /api/books/some-id

// Import NextResponse for returning responses
import { NextResponse } from "next/server";

// Import the book data from the local JSON file (for now, as per book before Prisma)
// We will remove this import later when we switch to Prisma
import books from "../data.json";

// Define an asynchronous function to handle DELETE requests to /api/books/[id]
// It receives the request object and the dynamic 'params' object from the URL
export const DELETE = async (request, { params }) => {
  // 1. Get the book ID from the dynamic route parameters
  // The key name 'id' matches the folder name '[id]'
  const id = params.id;

  // Log the ID to the server console to verify that we're capturing it
  console.log("Received ID for dynamic route:", id);

  // --- Start: Old in-memory array deletion logic (from book before Prisma) ---
  // This logic is temporary and will be replaced with Prisma logic later
  // Note: The ID from data.json is a number (1, 2, 3), while the ID from the URL is a string.
  // You might need to convert the URL ID to a number for comparison if your data.json IDs are numbers.
  // However, since we're moving to UUIDs with Prisma, this in-memory part is temporary anyway.
  const index = books.findIndex((book) => book.id == id); // Use == for loose comparison or convert types

  if (index !== -1) {
    books.splice(index, 1);
  }
  // --- End: Old in-memory array deletion logic ---

  // 2. Return a simple response confirming the ID received
  // This response confirms the handler was reached and the ID was captured
  return new NextResponse(
    JSON.stringify({ "Book deleted (in-memory, ID received)": id }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

// You could also define other handlers here for this dynamic route, e.g., GET for a single book
// export async function GET(request, {params}) { ... }
