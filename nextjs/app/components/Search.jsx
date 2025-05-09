// Mark this file as a Client Component
"use client";

// Import useState hook for managing input state
import { useState } from "react";

// Define the Search component
// It will receive a prop (likely a function) to handle the search logic in the parent
const Search = ({ onSearch }) => {
  // Receive onSearch prop
  // State to hold the current value of the search input
  const [query, setQuery] = useState("");

  // Function to handle input changes
  const handleInputChange = (event) => {
    // Get the new input value
    const newQuery = event.target.value;

    // Update the query state whenever the input value changes
    setQuery(newQuery);

    // --- Start: Call the onSearch prop with the new query ---
    // Call the function passed down from the parent (Books component)
    if (onSearch) {
      // Check if the prop was provided
      onSearch(newQuery);
    }
    // --- End: Call the onSearch prop ---

    console.log("Search input changed:", newQuery);
  };

  return (
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">Search Books</span>
      </label>
      <input
        type="text"
        placeholder="Enter book title..."
        className="input input-bordered w-full"
        value={query} // Bind the input value to the query state
        onChange={handleInputChange} // Call handleInputChange when the input changes
      />
    </div>
  );
};

export default Search;
