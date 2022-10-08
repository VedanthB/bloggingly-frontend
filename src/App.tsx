import React from "react";
import { Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { PageRender } from "./customRouter";

const App = () => {
  return (
    <div>
      <Header />

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
