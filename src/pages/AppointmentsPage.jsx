import { useEffect, useState } from "react";
import {
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from "../services/api";
import AppointmentCard from "../components/AppointmentCard";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  const loadAppointments = async () => {
    try {
      setError("");

      const response = await getAppointments();

      setAppointments(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const startEdit = (appointment) => {
    setMessage("");

    setEditingId(appointment.id);
    setEditDate(appointment.data.date);
    setEditTime(appointment.data.time);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDate("");
    setEditTime("");
  };

  const saveEdit = async (appointment) => {
    if (!editDate || !editTime) {
      setMessage("Please select a date and time.");
      return;
    }

    try {
      setMessage("");

      await updateAppointment(appointment.id, {
        ...appointment.data,
        date: editDate,
        time: editTime,
      });

      setEditingId(null);
      setEditDate("");
      setEditTime("");

      await loadAppointments();

      setMessage("Appointment updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update appointment.");
    }
  };

  const cancelAppointment = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?",
    );

    if (!confirmed) return;

    try {
      setMessage("");

      await deleteAppointment(id);

      if (editingId === id) {
        cancelEdit();
      }

      await loadAppointments();

      setMessage("Appointment cancelled successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to cancel appointment.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Loading appointments...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-8 text-center dark:bg-red-950">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-300">
          {error}
        </h2>

        <button
          type="button"
          onClick={() => {
            setLoading(true);
            loadAppointments();
          }}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Appointments
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Manage your upcoming appointments.
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 rounded-lg p-4 text-center font-medium ${
            message.includes("successfully")
              ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
              : "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300"
          }`}
        >
          {message}
        </div>
      )}

      {appointments.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-md dark:bg-gray-800">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
            No appointments yet
          </h2>

          <p className="mt-2 text-gray-500 dark:text-gray-300">
            Your booked appointments will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              editingId={editingId}
              editDate={editDate}
              editTime={editTime}
              onStartEdit={startEdit}
              onSaveEdit={saveEdit}
              onCancelEdit={cancelEdit}
              onDateChange={setEditDate}
              onTimeChange={setEditTime}
              onCancelAppointment={cancelAppointment}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default AppointmentsPage;
