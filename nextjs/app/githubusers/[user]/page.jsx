// This component will be rendered for dynamic routes like /githubusers/some-username
// It receives 'params' as a prop, which contains the dynamic segment values
// It's an async function because the Repos component it renders is async

import Repos from "../../components/Repos";

// The component is an async function because we will fetch data based on the user param
const UserReposPage = ({ params }) => {
  // Receive params prop
  // Destructure the 'user' property from the params object
  const { user } = params;

  console.log("Dynamic user segment:", user);

  return (
    <div>
      <Repos user={user} />
    </div>
  );
};

export default UserReposPage;
