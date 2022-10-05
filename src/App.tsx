import React from "react";
import { Routes, Route } from "react-router-dom";
import { PageRender } from "./customRouter";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PageRender />} />
      <Route path="/:page" element={<PageRender />} />
      <Route path="/:page/:slug" element={<PageRender />} />
    </Routes>
  );
};

export default App;
