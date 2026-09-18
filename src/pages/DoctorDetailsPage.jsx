import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDoctor } from "../services/api";

function DoctorDetailsPage() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDoctor(id);
      setDoctor(response.data);
    } catch (error) {
      console.error(error);
      setDoctor(null);
      setError("Failed to load doctor information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-200">
          Loading doctor information...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400">
          {error}
        </h2>

        <button
          type="button"
          onClick={fetchDoctor}
          className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Doctor not found
        </h2>

        <Link
          to="/doctors"
          className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Back to Doctors
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-colors duration-300 dark:bg-gray-800 md:flex">
        <div className="md:w-2/5">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="h-80 w-full object-cover md:h-full"
          />
        </div>

        <div className="p-6 md:w-3/5 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {doctor.name}
          </h1>

          <p className="mt-2 text-lg font-semibold text-blue-600 dark:text-blue-400">
            {doctor.specialty}
          </p>

          <p className="mt-5 leading-7 text-gray-600 dark:text-gray-300">
            {doctor.description}
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Working Days
              </p>

              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {doctor.workingDays.join(", ")}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Available Slots
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {doctor.slots.map((slot) => (
                  <span
                    key={slot}
                    className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={`/book/${doctor.id}`}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Book Appointment
            </Link>

            <Link
              to="/doctors"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Back to Doctors
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorDetailsPage;
