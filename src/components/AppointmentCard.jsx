function AppointmentCard({
  appointment,
  editingId,
  editDate,
  editTime,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDateChange,
  onTimeChange,
  onCancelAppointment,
}) {
  const isEditing = editingId === appointment.id;

  const data = appointment.data;

  return (
    <article className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg dark:bg-gray-800">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {data.doctorName}
      </h2>

      <p className="mt-3 text-gray-600 dark:text-gray-300">
        <strong className="text-gray-900 dark:text-white">Patient:</strong>{" "}
        {data.patientName}
      </p>

      {isEditing ? (
        <div className="mt-5 space-y-4">
          <div>
            <label
              htmlFor={`date-${appointment.id}`}
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Date
            </label>

            <input
              id={`date-${appointment.id}`}
              type="date"
              value={editDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900"
            />
          </div>

          <div>
            <label
              htmlFor={`time-${appointment.id}`}
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Time
            </label>

            <input
              id={`time-${appointment.id}`}
              type="text"
              value={editTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => onSaveEdit(appointment)}
              className="rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel Edit
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
            <p>
              <strong className="text-gray-900 dark:text-white">Date:</strong>{" "}
              {data.date}
            </p>

            <p>
              <strong className="text-gray-900 dark:text-white">Time:</strong>{" "}
              {data.time}
            </p>

            {data.note && (
              <p>
                <strong className="text-gray-900 dark:text-white">Note:</strong>{" "}
                {data.note}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onStartEdit(appointment)}
              className="rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Edit / Reschedule
            </button>

            <button
              type="button"
              onClick={() => onCancelAppointment(appointment.id)}
              className="rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white transition hover:bg-red-700"
            >
              Cancel Appointment
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export default AppointmentCard;
