// Mark this file as a Client Component
"use client";

// Import Link for the Amazon link
import Link from "next/link";

// Import useState and useEffect hooks
import { useState, useEffect } from "react";

// Import the Search component
import Search from "./Search";

// Import the AddBook component
import AddBook from "./AddBook"; // Added import

// Async function to fetch book data from our internal API
async function getBooks() {
  const res = await fetch("http://localhost:3000/api/books");

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const json = await res.json();
  return json;
}

// Define the Books component (Client Component)
const Books = () => {
  // State to hold the original list of all books
  const [allBooks, setAllBooks] = useState([]);

  // State to hold the list of books currently being displayed (filtered)
  const [displayedBooks, setDisplayedBooks] = useState([]);

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        setIsLoading(true);
        const fetchedBooks = await getBooks();
        setAllBooks(fetchedBooks);
        setDisplayedBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooksData();
  }, []); // Runs only once on mount

  // Function to handle search filtering
  const handleSearch = (query) => {
    const filtered = allBooks.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedBooks(filtered);
  };

  // --- Start: Function to handle adding a new book (will be passed to AddBook) ---
  const handleBookAdded = async (newBook) => {
    // Add the new book to the beginning of the allBooks and displayedBooks arrays
    setAllBooks((prevBooks) => [newBook, ...prevBooks]);
    setDisplayedBooks((prevBooks) => [newBook, ...prevBooks]);

    // Re-fetch the entire list from the API to ensure data is in sync
    try {
      const updatedBooks = await getBooks();
      setAllBooks(updatedBooks);

      // Re-apply the current search filter to the updated list
      // This ensures the newly added book appears if it matches the current search query
      const currentSearchQuery =
        document.querySelector(".input-bordered")?.value || ""; // Get current search input value

      const filtered = updatedBooks.filter((book) =>
        book.title.toLowerCase().includes(currentSearchQuery.toLowerCase())
      );

      setDisplayedBooks(filtered);
    } catch (error) {
      console.error("Error re-fetching books after adding:", error);
    }
  };
  // --- End: Function to handle adding a new book ---

  // This function will be called when the delete button is clicked
  const handleDeleteBook = async (bookId) => {
    console.log("Attempting to delete book with ID:", bookId);

    // Make the DELETE request to the API
    try {
      const res = await fetch(`http://localhost:3000/api/books/${bookId}`, {
        method: "DELETE", // Specify the HTTP method as DELETE
      });

      // Check if the request was successful
      if (!res.ok) {
        console.error("Failed to delete book:", res.statusText);
        alert("Failed to delete book. Please try again");
        return;
      }

      // Parse the JSON response
      const result = await res.json();
      console.log("Book deleted successfully:", result);

      // --- Update state to remove the deleted book from the UI ---
      // Filter the allBooks array to remove the book with the deleted ID
      setAllBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookId)
      );

      // Filter the displayedBooks array to remove the book with the deleted ID
      setDisplayedBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookId)
      );
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error deleting book:", error);
      alert("An error occurred while deleting the book. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Portfolio Books
      </h1>

      {/* Pass the handleBookAdded function as a prop */}
      <AddBook onBookAdded={handleBookAdded} />

      {/* Render the Search component */}
      <Search onSearch={handleSearch} />

      {/* Conditional Rendering based on loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <button className="btn loading">Loading Books</button>
        </div>
      ) : (
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
                  {/* Add an onClick handler to call handleDeleteBook with the book's ID */}
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Handle case where no books are found and not loading */}
      {!isLoading && displayedBooks.length === 0 && (
        <p className="text-center text-gray-600 mt-8">No books found.</p>
      )}
    </div>
  );
};

// Export the component
export default Books;
