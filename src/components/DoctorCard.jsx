import { Link } from "react-router-dom";
import useAppStore from "../stores/useAppStore";

function DoctorCard({ doctor }) {
  const { favorites, toggleFavorite } = useAppStore();

  const isFavorite = favorites.some((item) => item.id === doctor.id);

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
      <div className="relative">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-64 w-full object-cover"
        />

        <button
          type="button"
          onClick={() => toggleFavorite(doctor)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl shadow-md transition hover:scale-105 dark:bg-gray-700"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {doctor.name}
        </h2>

        <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
          {doctor.specialty}
        </p>

        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {doctor.description}
        </p>

        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          <strong>Working Days:</strong> {doctor.workingDays.join(", ")}
        </p>

        <div className="mt-5 flex gap-3">
          <Link
            to={`/doctors/${doctor.id}`}
            className="flex-1 rounded-lg border border-blue-600 px-4 py-2 text-center text-sm font-semibold text-blue-600 transition hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            View Details
          </Link>

          <Link
            to={`/book/${doctor.id}`}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Book
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DoctorCard;
