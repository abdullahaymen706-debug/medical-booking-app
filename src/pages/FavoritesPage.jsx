import useAppStore from "../stores/useAppStore";
import DoctorCard from "../components/DoctorCard";

function FavoritesPage() {
  const { favorites } = useAppStore();

  return (
    <section>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Favorite Doctors</h1>

        <p className="mt-2 text-gray-600">
          Doctors you added to your favorites.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">
            No favorite doctors yet
          </h2>

          <p className="mt-2 text-gray-500">
            Add doctors to your favorites to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoritesPage;
