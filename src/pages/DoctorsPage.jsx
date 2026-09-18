import { useEffect, useState } from "react";
import { getDoctors } from "../services/api";
import DoctorCard from "../components/DoctorCard";

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const specialties = [
    "All",
    ...new Set(doctors.map((doctor) => doctor.specialty)),
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const normalizedDoctorName = doctor.name.toLowerCase().replace(/\s+/g, "");

    const normalizedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, "");

    const matchesName = normalizedDoctorName.includes(normalizedSearchTerm);

    const matchesSpecialty =
      specialty === "All" || doctor.specialty === specialty;

    return matchesName && matchesSpecialty;
  });

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Loading doctors...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center text-red-600 dark:bg-red-950 dark:text-red-300">
        <h2 className="text-xl font-semibold">{error}</h2>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Find Your Doctor
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Choose a doctor and book your appointment easily.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="doctor-search"
            className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
          >
            Search by Doctor Name
          </label>

          <input
            id="doctor-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctor..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-blue-900"
          />
        </div>

        <div>
          <label
            htmlFor="specialty-filter"
            className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
          >
            Filter by Specialty
          </label>

          <select
            id="specialty-filter"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-900"
          >
            {specialties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-md dark:bg-gray-800">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
            No doctors found
          </h2>

          <p className="mt-2 text-gray-500 dark:text-gray-300">
            Try another doctor name or specialty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </section>
  );
}

export default DoctorsPage;
