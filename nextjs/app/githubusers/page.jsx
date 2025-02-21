async function fetchGithubUsers() {
  const res = await fetch("https://api.github.com/search/users?q=greg");
  const json = await res.json();
  return json.items;
}

const GitHubUsersPage = async () => {
  const users = await fetchGithubUsers();
  console.log(users);
  return (
    <div>
      <h1>Github Users Page</h1>
    </div>
  );
};

export default GitHubUsersPage;
