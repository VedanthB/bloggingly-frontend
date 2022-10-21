import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  total: number;
  callback: (num: number) => void;
}

const Pagination: React.FC<IProps> = ({ total, callback }) => {
  const [page, setPage] = useState(1);

  const newArr = [...Array(total)].map((_, i) => i + 1);

  const navigate = useNavigate();

  let location = useLocation();

  const handlePagination = (num: number) => {
    navigate(`?page=${num}`);
    callback(num);
  };

  useEffect(() => {
    const num = location.search.slice(6) || 1;

    setPage(Number(num));
  }, [location.search]);

  return (
    <nav>
      <ul className="inline-flex items-center -space-x-px">
        {page > 1 && (
          <li onClick={() => handlePagination(page - 1)}>
            <div className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
              <span className="sr-only">Previous</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </li>
        )}

        {newArr.map((num) => (
          <li key={num} onClick={() => handlePagination(num)}>
            <div
              className={` ${
                num === page
                  ? "z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 "
                  : "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              } `}
            >
              {num}
            </div>
          </li>
        ))}

        {page < total && (
          <li onClick={() => handlePagination(page + 1)}>
            <div className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
              <span className="sr-only">Next</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
