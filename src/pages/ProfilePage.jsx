import { useRef, useState } from "react";
import useAppStore from "../stores/useAppStore";

function ProfilePage() {
  const { profile, setProfile } = useAppStore();

  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [message, setMessage] = useState("");

  // Uncontrolled input example using useRef
  const noteRef = useRef(null);

  const saveProfile = (e) => {
    e.preventDefault();

    const note = noteRef.current.value;

    setProfile({
      name,
      phone,
      note,
    });

    setMessage("Profile saved successfully!");
  };

  return (
    <section className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

        <p className="mt-2 text-gray-600">Manage your personal information.</p>
      </div>

      <form
        onSubmit={saveProfile}
        className="rounded-2xl bg-white p-6 shadow-md sm:p-8"
      >
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Phone
            </label>

            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="note"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Profile Note
            </label>

            <input
              id="note"
              type="text"
              ref={noteRef}
              defaultValue={profile.note || ""}
              placeholder="Write a small note..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-xs text-gray-500">
              This field is an uncontrolled input handled with useRef.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Save Profile
          </button>

          {message && (
            <p className="rounded-lg bg-green-50 px-4 py-3 text-center font-medium text-green-700">
              {message}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

export default ProfilePage;
