import React from "react";

const NotFound = () => {
  return (
    <div className="relative" style={{ minHeight: "calc(100vh - 70px)" }}>
      <h2
        className="absolute text-gray-500"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        404 | NotFound
      </h2>
    </div>
  );
};

export default NotFound;
