import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import useAppStore from "./stores/useAppStore";

function App() {
  const darkMode = useAppStore((state) => state.darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-6 py-10 transition-colors duration-300 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
