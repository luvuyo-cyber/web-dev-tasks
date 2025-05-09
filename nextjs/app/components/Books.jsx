// Async function to fetch book data from our internal API
// This function will run on the server as it's part of a Server Component

import Link from "next/link";

async function getBooks() {
  // Fetch data from our /api/books endpoint
  // In a Server Component, you can use a relative path or full URL
  // Using a full URL (localhost:3000) is often clearer for API calls
  const res = await fetch("http://localhost:3000/api/books", {
    next: {
      revalidate: 60,
    },
  });

  // Check if the response is OK
  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  // Parse the response as JSON
  const json = await res.json();

  // Return the JSON data (the array of books)
  return json;
}

// Define the Books component (will be async)
// This component fetches and displays the list of books
const Books = async () => {
  // Call the getBooks function and await the result
  const books = await getBooks();

  // Log the fetched books to the server console
  //   console.log("Fetched Books:", books);

  return (
    <div className="container mx-auto px-4 py-8">
      {" "}
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Portfolio Books
      </h1>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {" "}
        {books.map((book) => (
          <div
            key={book.id}
            className="card w-full bg-base-100 shadow-xl image-full"
          >
            {" "}
            <figure>
              <img
                src={book.img}
                alt={`Cover of ${book.title}`}
                className="w-full h-auto object-cover"
              />
            </figure>
            <div className="card-body justify-end text-white bg-black bg-opacity-50">
              {" "}
              <h2 className="card-title text-white">{book.title}</h2>{" "}
              <div className="card-actions justify-end">
                {/* Link to the Amazon page */}
                <Link
                  href={book.link}
                  className="btn btn-primary btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  {/* Styled link button */}
                  See in Amazon
                </Link>
                {/* Delete Button (placeholder for now) */}
                {/* Will implement delete functionality later */}
                <button className="btn btn-error btn-sm">Delete</button>{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Handle case where no books are found */}
      {books.length === 0 && (
        <p className="text-center text-gray-600 mt-8">No books found.</p>
      )}
    </div>
  );
};

export default Books;
