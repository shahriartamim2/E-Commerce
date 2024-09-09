
import PageTitle from "@/components/PageTitle";


const Error = ({ message, onRetry }) => {
  return (
    <>
      <PageTitle title="404 | Not Found" />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
          <div className="text-red-600 text-4xl mb-4">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-4">
            {message || "An unexpected error occurred. Please try again later."}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Error;
