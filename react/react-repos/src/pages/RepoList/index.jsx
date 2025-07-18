import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useRepos } from "@/hooks/useRepos";

const RepoList = () => {
  const { id } = useParams();
  console.log(useParams());
  const navigate = useNavigate();
  // hooks
  const { repos, loading, err } = useRepos(id);
  console.log(repos, loading, err);

  useEffect(() => {
    if (!id.trim()) {
      navigate("/");
      return;
    }
  }, []);
  if (loading) return <>Loading...</>;
  if (err) return <>Error: {err}</>;

  return (
    <>
      <h2> Repositories for {id}</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link key={repo.id} to={`/users/${id}/repos/${repo.id}`}>
              {repo.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default RepoList;
