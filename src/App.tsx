import React from "react";
import { Routes, Route } from "react-router-dom";
import { Alert, Footer, Header } from "./components";
import { PageRender } from "./customRouter";

const App = () => {
  return (
    <div className="bg-gray-100">
      <Header />

      <Alert />

      <Routes>
        <Route path="/" element={<PageRender />} />
        <Route path="/:page" element={<PageRender />} />
        <Route path="/:page/:slug" element={<PageRender />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
