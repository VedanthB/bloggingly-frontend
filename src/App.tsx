import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { Alert, Footer, Header } from "./components";
import { PageRender } from "./customRouter";
import { getBlogs, getCategories, refreshToken } from "./features";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    dispatch(refreshToken(isLoggedIn));

    dispatch(getBlogs());

    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="bg-gray-100">
      <Header />

      <Alert />

      <div className="relative top-16">
        <Routes>
          <Route path="/" element={<PageRender />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:slug" element={<PageRender />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
