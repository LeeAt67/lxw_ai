import { useRepoStore } from "../../store/repo";
import { useEffect } from "react";

const RepoList = () => {
  const { repos, loading, error, fetchRepos } = useRepoStore();
  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
            <p>{repo.description || "No description"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RepoList;
