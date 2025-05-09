// Async function to fetch repositories for a specific GitHub user
// This function will run on the server as it's part of a Server Component

import Link from "next/link";

async function fetchRepos(user) {
  // Construct the API URL using the provided username
  const res = await fetch(`https://api.github.com/users/${user}/repos`, {
    // Added revalidate option to control caching
    next: {
      revalidate: 60,
    },
  });

  // This promise will resolve after 3000 milliseconds (3 seconds)
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // Check if the request was successful
  if (!res.ok) {
    throw new Error("Failed to fetch repositories");
  }

  // Parse the response as JSON
  const json = await res.json();

  // Return the array of repositories
  return json;
}

// Define the Repos component (will be async)
// It will receive the username as a prop
const Repos = async ({ user }) => {
  // Call the fetchRepos function and await the result
  const repos = await fetchRepos(user);

  //   console.log("Fetched Repos:", repos);

  return (
    <div className="overflow-x-auto mt-4">
      {" "}
      <h2 className="text-2xl font-bold mb-4">Repositories for {user}</h2>{" "}
      <table className="table w-full">
        {" "}
        <thead>
          <tr>
            <th>Repository Name</th>
            <th>Description</th>
            <th>Stars</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the repos array */}
          {repos.map((repo) => (
            // Create a table row for each repository
            // Use the repo's id as a unique key
            <tr key={repo.id}>
              {/* Repository Name */}
              <td>
                <div className="font-bold">{repo.name}</div>
              </td>
              {/* Description */}
              <td>
                {/* Display description, or 'No description' if null */}
                {repo.description || "No description"}
              </td>
              {/* Stars Count */}
              <td>
                {repo.stargazers_count} {/* Display stargazers_count */}
              </td>
              {/* Link to Repo (Optional - could add a link here) */}
              <td>
                {/* Link to the repo on GitHub */}
                <Link
                  href={repo.html_url}
                  className="btn btn-ghost btn-xs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Repo
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Handle case where no repos are found */}
      {repos.length === 0 && <p>No repositories found for this user.</p>}
    </div>
  );
};

export default Repos;
