import { NavLink } from "react-router-dom";
import useAppStore from "../stores/useAppStore";

function Navbar() {
  const favorites = useAppStore((state) => state.favorites);
  const darkMode = useAppStore((state) => state.darkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);

  const getLinkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-blue-600"
        : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
    }`;

  return (
    <nav className="bg-white shadow-md transition-colors duration-300 dark:bg-gray-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <NavLink
          to="/doctors"
          className="text-center text-2xl font-bold text-blue-600 sm:text-left"
        >
          MediCare
        </NavLink>

        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
          <NavLink to="/doctors" className={getLinkClass}>
            Doctors
          </NavLink>

          <NavLink to="/appointments" className={getLinkClass}>
            My Appointments
          </NavLink>

          <NavLink to="/favorites" className={getLinkClass}>
            Favorites ({favorites.length})
          </NavLink>

          <NavLink to="/profile" className={getLinkClass}>
            Profile
          </NavLink>

          <button
            type="button"
            onClick={toggleDarkMode}
            className="rounded-lg bg-gray-100 px-3 py-2 text-lg transition hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
