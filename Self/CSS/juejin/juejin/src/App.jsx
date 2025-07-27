import { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import BlankLayout from "./components/BlankLayout";

const Recommended = lazy(() => import("./pages/Recommended"));
const Following = lazy(() => import("./pages/Following"));
const Rank = lazy(() => import("./pages/Rank"));
const Backend = lazy(() => import("./pages/Backend"));
const Frontend = lazy(() => import("./pages/Frontend"));
const Android = lazy(() => import("./pages/Android"));
const Ios = lazy(() => import("./pages/Ios"));
const Ai = lazy(() => import("./pages/Ai"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Recommended />}></Route>
          <Route path="/recommended" element={<Recommended />}></Route>
          <Route path="/following" element={<Following />}></Route>
          <Route path="/rank" element={<Rank />}></Route>
          <Route path="/backend" element={<Backend />}></Route>
          <Route path="/frontend" element={<Frontend />}></Route>
          <Route path="/android" element={<Android />}></Route>
          <Route path="/ios" element={<Ios />}></Route>
          <Route path="/ai" element={<Ai />}></Route>
        </Route>

        <Route element={<BlankLayout />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
