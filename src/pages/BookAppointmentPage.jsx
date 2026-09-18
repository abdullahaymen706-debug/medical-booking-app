import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createAppointment, getDoctor } from "../services/api";

function BookAppointmentPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loadingDoctor, setLoadingDoctor] = useState(true);
  const [doctorError, setDoctorError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoadingDoctor(true);
        setDoctorError("");

        const response = await getDoctor(doctorId);
        setDoctor(response.data);
      } catch (error) {
        console.error(error);
        setDoctorError("Failed to load doctor information.");
      } finally {
        setLoadingDoctor(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const onSubmit = async (data) => {
    try {
      setSubmitError("");

      await createAppointment({
        ...data,
        doctorId,
        doctorName: doctor.name,
      });

      navigate("/appointments");
    } catch (error) {
      console.error(error);
      setSubmitError("Failed to book the appointment. Please try again.");
    }
  };

  if (loadingDoctor) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-200">
          Loading doctor information...
        </h2>
      </div>
    );
  }

  if (doctorError || !doctor) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl bg-red-50 p-8 text-center dark:bg-red-950">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-300">
          {doctorError || "Doctor not found."}
        </h2>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="mx-auto max-w-2xl">
      <div className="rounded-2xl bg-white p-6 shadow-lg transition-colors duration-300 dark:bg-gray-800 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Book Appointment
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Doctor:{" "}
            <strong className="font-semibold text-blue-600 dark:text-blue-400">
              {doctor.name}
            </strong>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="patientName"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Patient Name
            </label>

            <input
              id="patientName"
              type="text"
              {...register("patientName", {
                required: "Patient name is required",
                minLength: {
                  value: 2,
                  message: "Patient name must be at least 2 characters",
                },
              })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900"
              placeholder="Enter patient name"
            />

            {errors.patientName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.patientName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900"
              placeholder="example@email.com"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Phone
            </label>

            <input
              id="phone"
              type="tel"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9+\-\s()]{8,20}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900"
              placeholder="Enter phone number"
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Date
            </label>

            <input
              id="date"
              type="date"
              min={today}
              {...register("date", {
                required: "Date is required",
              })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900"
            />

            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="time"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Time
            </label>

            <select
              id="time"
              {...register("time", {
                required: "Time is required",
              })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900"
            >
              <option value="">Select time</option>

              {doctor.slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            {errors.time && (
              <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="doctor"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Doctor
            </label>

            <input
              id="doctor"
              type="text"
              value={doctor.name}
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-600 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>

          <div>
            <label
              htmlFor="note"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Note (Optional)
            </label>

            <textarea
              id="note"
              rows="4"
              {...register("note")}
              className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900"
              placeholder="Add a note if needed..."
            />
          </div>

          {submitError && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600 dark:bg-red-950 dark:text-red-300">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookAppointmentPage;
