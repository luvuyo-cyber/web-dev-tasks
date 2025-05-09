// Async function to fetch book data from our internal API
// This function will run on the server as it's part of a Server Component

"use client"; // Mark this file as a Client Component
import Link from "next/link";

// Import useState and useEffect hooks for client-side state and effects
import { useState, useEffect } from "react";

// Import the Search component
import Search from "./Search";

// Async function to fetch book data from our internal API
// This function will now be called on the client inside useEffect
async function getBooks() {
  // Fetch data from our /api/books endpoint
  // In a Client Component, you MUST use a full URL (http://localhost:3000)
  // Relative paths won't work reliably for client-side fetches
  const res = await fetch("http://localhost:3000/api/books");

  // Optional: Add revalidate option for caching control (from Chapter 14)
  // Note: 'revalidate' option in fetch is primarily for Server Components.
  // For client-side fetching, caching is handled by the browser or custom logic.
  // const res = await fetch("http://localhost:3000/api/books", {
  //   next: { revalidate: 60 } // This option is ignored in client components
  // });

  // Check if the response is OK
  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  // Parse the response as JSON
  const json = await res.json();

  // Return the JSON data (the array of books)
  return json;
}

// Define the Books component as a standard functional component (no longer async)
// It will fetch data using useEffect and manage state with useState
const Books = () => {
  // Removed 'async'

  // State to hold the original list of all books
  const [allBooks, setAllBooks] = useState([]);

  // State to hold the list of books currently being displayed (filtered)
  const [displayedBooks, setDisplayedBooks] = useState([]);

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Define an async function inside useEffect to call getBooks
    const fetchBooksData = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching

        const fetchedBooks = await getBooks(); // Call the fetch function

        setAllBooks(fetchedBooks); // Store all fetched books

        setDisplayedBooks(fetchedBooks); // Initially display all books
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching (success or error)
      }
    };

    fetchBooksData(); // Call the async fetch function

    // The empty dependency array [] means this effect runs only once after the initial render
  }, []);

  // --- Start: Function to handle search filtering ---
  const handleSearch = (query) => {
    // Filter the allBooks list based on the query
    const filtered = allBooks.filter((book) =>
      // Convert both title and query to lowercase for case-insensitive search
      book.title.toLowerCase().includes(query.toLowerCase())
    );

    // Update the displayedBooks state with the filtered list
    setDisplayedBooks(filtered);
  };
  // --- End: Function to handle search filtering ---

  // Log the fetched books to the server console
  //   console.log("Fetched Books:", books);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Portfolio Books
      </h1>

      {/* --- Start: Render the Search component and pass the handleSearch function --- */}
      {/* Pass the handleSearch function as a prop to the Search component */}
      <Search onSearch={handleSearch} />
      {/* --- End: Render the Search component --- */}

      {/* Conditional Rendering based on loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <button className="btn loading">Loading Books</button>
        </div>
      ) : (
        // Display displayedBooks grid if data is not loading
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedBooks.map((book) => (
            <div
              key={book.id}
              className="card w-full bg-base-100 shadow-xl image-full"
            >
              <figure>
                <img
                  src={book.img}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/400x600?text=Image+Not+Found";
                  }}
                />
              </figure>
              <div className="card-body justify-end text-white bg-black bg-opacity-50">
                <h2 className="card-title text-white">{book.title}</h2>
                <div className="card-actions justify-end">
                  <Link
                    href={book.link}
                    className="btn btn-primary btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See in Amazon
                  </Link>
                  <button className="btn btn-error btn-sm">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Handle case where no books are found and not loading */}
      {!isLoading && displayedBooks.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          No books found matching your search.
        </p>
      )}
    </div>
  );
};

export default Books;
