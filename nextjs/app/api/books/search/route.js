// Import the book data from the local JSON file (for now)
import books from "../data.json";

import { NextResponse } from "next/server";

// Define an asynchronous function to handle GET requests to /api/books/search
export async function GET(req) {
  // The incoming request object 'req' contains the full URL.
  // We can parse the URL and extract the search parameters.
  const { searchParams } = new URL(req.url);

  // Get the value of the 'query' parameter
  const query = searchParams.get("query");

  // Log the searchParams object to the server console to see what we got
  //   console.log("Search Params:", searchParams);

  // Log the value of the 'query' parameter to the server console
  //   console.log("Search Query Value:", query);

  // Filter the books array based on the query
  // Convert both the book title and the query to lowercase for case-insensitive matching
  const filteredBooks = books.filter((book) => {
    // If query is null or empty, return all books
    if (!query) return true;

    // Otherwise, check if the book title includes the query string (case-insensitive)
    return book.title.toLowerCase().includes(query.toLowerCase());
  });

  // Return the filtered array of books as a JSON response
  return NextResponse.json(filteredBooks);
}
