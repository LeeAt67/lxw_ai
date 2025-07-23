import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
const Home = lazy(() => import("./view/Home"));
const Login = lazy(() => import("./view/Login"));
const Pay = lazy(() => import("./view/Pay"));
const RequireAuth = lazy(() => import("./components/RequireAuth"));

function App() {
  useEffect(() => {}, []);
  return (
    <>
      <Suspense>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/pay"
            element={
              <RequireAuth>
                <Pay />
              </RequireAuth>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
