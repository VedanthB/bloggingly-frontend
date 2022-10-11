import { useAppSelector } from "../../app/hooks";
import Loader from "./Loader";
import Toast from "./Toast";

const Alert = () => {
  const { alert } = useAppSelector((state) => state);

  return (
    <div>
      {alert.loading && <Loader />}

      {alert.error && (
        <Toast title="Error" body={alert.error} bgColor="bg-red-500" />
      )}

      {alert.success && (
        <Toast title="Success" body={alert.success} bgColor="bg-green-500" />
      )}
    </div>
  );
};

export default Alert;

export const showErrMsg = (msg: string) => {
  return (
    <div className="text-center bg-red-300 text-gray-800 p-4 rounded">
      {msg}
    </div>
  );
};

export const showSuccessMsg = (msg: string) => {
  return (
    <div className="text-center bg-green-300 text-gray-800 p-4 rounded">
      {msg}
    </div>
  );
};
