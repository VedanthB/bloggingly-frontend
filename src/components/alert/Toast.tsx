import { useAppDispatch } from "../../app/hooks";
import { closeToast } from "../../features";

interface IProps {
  title: string;
  body: string | string[];
  bgColor: string;
}

const Toast = ({ title, body, bgColor }: IProps) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeToast({}));
  };

  return (
    <div
      id="toast-notification"
      className={`p-4 w-full max-w-xs fixed text-white  rounded-lg shadow ${bgColor} `}
      style={{ top: "1rem", right: "1rem", zIndex: 50, minWidth: "200px" }}
      role="alert"
    >
      <div className="flex items-center mb-3">
        <span className="mb-1 text-sm font-semibold text-white">{title}</span>

        <button
          type="button"
          className={`ml-auto -mx-1.5 -my-1.5 ${bgColor} text-gray-800 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 ${
            bgColor === "bg-red-500" ? "hover:bg-red-200" : "hover:bg-green-200"
          }  inline-flex h-8 w-8`}
          data-dismiss-target="#toast-notification"
          aria-label="Close"
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div className="flex items-center">
        <div className="ml-3 text-sm font-normal">
          <div className="text-sm font-normal">
            {typeof body === "string" ? (
              body
            ) : (
              <ul>
                {body.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
