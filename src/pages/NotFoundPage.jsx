import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex  flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>

      <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>

      <p className="mt-3 text-gray-600">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/doctors"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Doctors
      </Link>
    </div>
  );
}

export default NotFoundPage;
