// Mark this file as a Client Component
"use client";

// Import useState hook for managing form state
import { useState } from "react";

// Define the AddBook component
const AddBook = ({ onBookAdded }) => {
  // State to manage the visibility of the modal/form
  const [modalOpen, setModalOpen] = useState(false);

  // State for each form input field
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookLink, setNewBookLink] = useState("");
  const [newBookImg, setNewBookImg] = useState("");

  // Function to handle input changes for the title field
  const handleTitleChange = (e) => {
    setNewBookTitle(e.target.value);
  };

  // Function to handle input changes for the link field
  const handleLinkChange = (e) => {
    setNewBookLink(e.target.value);
  };

  // Function to handle input changes for the image URL field
  const handleImgChange = (e) => {
    setNewBookImg(e.target.value);
  };

  // Function to handle form submission
  const handleSubmitNewBook = async (e) => {
    // Prevent the default form submission behavior (page reload)
    e.preventDefault();

    // Log the form data for testing
    // console.log("Submitting new book:", {
    //   title: newBookTitle,
    //   link: newBookLink,
    //   img: newBookImg,
    // });

    const newBookData = {
      title: newBookTitle,
      link: newBookLink,
      img: newBookImg,
    };

    console.log("Submitting new book:", newBookData);

    //Implement the POST request to the API here
    try {
      const res = await fetch("http://localhost:3000/api/books", {
        method: "POST", // Specify the HTTP method as POST
        headers: {
          "Content-Type": "application/json", // Tell the server we are sending JSON
        },
        body: JSON.stringify(newBookData), // Convert the JavaScript object to a JSON string for the body
      });

      // Check if the request was successful
      if (!res.ok) {
        // Handle errors (e.g., show an error message to the user)
        console.error("Failed to add book:", res.statusText);
        alert("Failed to add book. Please try again.");
        return; // Stop execution if the request failed
      }

      // Parse the JSON response from the API (contains the added book data with ID)
      const result = await res.json();
      console.log("Book added successfully:", result);

      // Call the onBookAdded prop function, passing the new book data (including ID from API)
      if (onBookAdded) {
        // Pass the book object returned by the API
        onBookAdded(result.book);
      }

      // Reset form fields after submission (or after successful API call)
      setNewBookTitle("");
      setNewBookLink("");
      setNewBookImg("");

      // Close the modal after submission (or after successful API call)
      setModalOpen(false);
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error adding book:", error);
      alert("An error occurred while adding the book. Please try again.");
    }
  };

  return (
    <div>
      {/* Use onClick to manually control the modal state */}
      <label
        htmlFor="add_book_modal"
        className="btn btn-primary w-full mb-4"
        onClick={() => setModalOpen(true)}
      >
        {" "}
        Add New Book
      </label>

      {/* The checkbox input controls the modal visibility */}
      <input
        type="checkbox"
        id="add_book_modal"
        className="modal-toggle"
        checked={modalOpen}
        onChange={() => setModalOpen(!modalOpen)}
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Book</h3>

          {/* The Form */}
          <form onSubmit={handleSubmitNewBook}>
            {/* Title Input */}
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Book Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter title"
                className="input input-bordered w-full"
                value={newBookTitle}
                onChange={handleTitleChange}
                required
              />
            </div>

            {/* Link Input */}
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Book Link (e.g., Amazon URL)</span>
              </label>
              <input
                type="url"
                placeholder="Enter link"
                className="input input-bordered w-full"
                value={newBookLink}
                onChange={handleLinkChange}
                required
              />
            </div>

            {/* Image URL Input */}
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Book Image URL</span>
              </label>
              <input
                type="url"
                placeholder="Enter image URL"
                className="input input-bordered w-full"
                value={newBookImg}
                onChange={handleImgChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Add Book
              </button>
              {/* Close button using the modal-toggle label */}
              <label htmlFor="add_book_modal" className="btn">
                Cancel
              </label>{" "}
            </div>
          </form>
        </div>
        {/* Label to close the modal when clicking outside */}
        <label className="modal-backdrop" htmlFor="add_book_modal">
          Close
        </label>
      </div>
    </div>
  );
};

export default AddBook;
