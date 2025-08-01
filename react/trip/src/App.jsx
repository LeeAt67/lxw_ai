import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import BlankLayout from "@/components/BlankLayout";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";

const Home = lazy(() => import("@/pages/Home"));
const Search = lazy(() => import("@/pages/Search"));
const Discount = lazy(() => import("@/pages/Discount"));
const Collection = lazy(() => import("@/pages/Collection"));
const Trip = lazy(() => import("@/pages/Trip"));
const Account = lazy(() => import("@/pages/Account"));
const Detail = lazy(() => import("@/pages/Detail"));
const Coze = lazy(() => import("./pages/Coze/index.jsx"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 带有tabbar的Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/home" />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/discount" element={<Discount />}></Route>
            <Route path="/Collection" element={<Collection />}></Route>
            <Route path="/trip" element={<Trip />}></Route>
            <Route path="/account" element={<Account />}></Route>
          </Route>

          {/* 空的Layout */}
          <Route element={<BlankLayout />}>
            <Route path="/coze" element={<Coze />} />
            <Route path="/search" element={<Search />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
          </Route>
        </Routes>
      </Suspense>
      <Toast />
    </>
  );
}

export default App;
