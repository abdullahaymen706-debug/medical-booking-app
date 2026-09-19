import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import FavoritesPage from "../pages/FavoritesPage";
import App from "../App";
import DoctorsPage from "../pages/DoctorsPage";
import DoctorDetailsPage from "../pages/DoctorDetailsPage";
import BookAppointmentPage from "../pages/BookAppointmentPage";
import AppointmentsPage from "../pages/AppointmentsPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/doctors" replace />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="doctors/:id" element={<DoctorDetailsPage />} />
          <Route path="book/:doctorId" element={<BookAppointmentPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default Router;
