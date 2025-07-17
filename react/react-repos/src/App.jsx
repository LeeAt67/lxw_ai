import { useState, useEffect, Suspense, lazy } from "react";
import "./App.css";
// import { getRepos, getRepoDetail } from "./api/repos";
import { Routes, Route, Navigate } from "react-router-dom";

import Loading from "./components/Loading";
const RepoList = lazy(() => import("./pages/RepoList"));

function App() {
  //useEffect(() => {
  // (async () => {
  // const repos = await getRepos("LeeAt67");
  // const repo = await getRepoDeail("LeeAt67", "lxw_ai");
  // console.log(repos, repo);
  // })();
  // return () => {
  //   console.log("----");
  // };
  //}, []);

  return(
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route
        path="/users/:id/repos"
        element={<RepoList />}
      />
      <Route
        path="*"
        element={<Navigate to="/users/LeeAt67/repos" />}
      />
    </Routes>
  </Suspense>
  )
}

export default App;
