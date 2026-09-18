# Medical Booking App

A responsive medical booking application built with React, allowing users to browse doctors, view doctor details, book appointments, and manage their appointments.

## Features

- Browse doctors from a REST API
- Search doctors by name
- Filter doctors by specialty
- View dynamic doctor details
- Book medical appointments
- Validate booking forms using React Hook Form
- View all booked appointments
- Edit and reschedule appointments
- Cancel appointments with confirmation
- Loading, error, empty, and success states
- Manage profile information using Zustand
- Controlled input for doctor search
- Uncontrolled input using `useRef`
- Responsive design for desktop and mobile
- 404 Not Found page
- REST API communication using Axios

## Technologies

- React
- Vite
- React Router
- Zustand
- Axios
- React Hook Form
- Tailwind CSS
- json-server
- JavaScript

## Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── DoctorCard.jsx
│   └── AppointmentCard.jsx
├── pages/
│   ├── DoctorsPage.jsx
│   ├── DoctorDetailsPage.jsx
│   ├── BookAppointmentPage.jsx
│   ├── AppointmentsPage.jsx
│   ├── ProfilePage.jsx
│   └── NotFoundPage.jsx
├── services/
│   └── api.js
├── stores/
│   └── useAppStore.js
├── routes/
│   └── router.jsx
├── App.jsx
├── index.css
└── main.jsx

db.json

