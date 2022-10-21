import React from "react";

interface IProps {
  setTab: (value: string) => void;
  tab: string;
}

const Tabs: React.FC<IProps> = ({ tab, setTab }) => {
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
      <ul className="flex flex-wrap  -mb-px w-full">
        <li className="w-[50%]">
          <div
            onClick={() => setTab("Edit")}
            className={`inline-block w-full p-4 cursor-pointer rounded-t-lg border-b-2 ${
              tab === "Edit"
                ? "text-blue-600 border-blue-600"
                : "border-transparent  hover:text-gray-600 hover:border-gray-300"
            } `}
          >
            Edit
          </div>
        </li>
        <li className="w-[50%]">
          <div
            onClick={() => setTab("Preview")}
            className={`inline-block w-full p-4 cursor-pointer rounded-t-lg border-b-2 ${
              tab === "Preview"
                ? "text-blue-600 border-blue-600"
                : "border-transparent  hover:text-gray-600 hover:border-gray-300"
            } `}
          >
            Preview
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
