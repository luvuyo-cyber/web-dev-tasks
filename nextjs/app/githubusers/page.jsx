// Import the Link component for navigation
import Link from "next/link";

// Async function to fetch GitHub users (from Chapter 9)
async function fetchGitHubUsers() {
  const res = await fetch("https://api.github.com/search/users?q=greg");

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub users");
  }

  const json = await res.json();
  return json.items;
}

// This component will be rendered for the /githubusers route
// It fetches data and renders it in a table
const GitHubUsersPage = async () => {
  // Fetch the users data
  const users = await fetchGitHubUsers();

  return (
    <div className="overflow-x-auto">
      <h1>GitHub Users Page</h1>
      <table className="table">
        {" "}
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
            <th>Repos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            // Use the user's id as a unique key for React
            <tr key={user.id}>
              {/* First column: Name (including avatar and ID) */}
              <td>
                <div className="flex items-center gap-3">
                  {" "}
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.avatar_url}
                        alt={`${user.login}'s avatar`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.login}</div>
                    <div className="text-sm opacity-50">{user.id}</div>{" "}
                  </div>
                </div>
              </td>

              {/* Second column: GitHub Profile URL */}
              <td>
                <Link
                  href={user.html_url}
                  className="btn btn-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </Link>
              </td>

              {/* Third column: Link to Repos */}
              <th>
                <Link
                  href={`/githubusers/${user.login}`}
                  className="btn btn-link"
                >
                  {" "}
                  Go to Repos{" "}
                </Link>
              </th>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GitHubUsersPage;
