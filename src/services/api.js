// src/services/api.js

// جلب جميع الأطباء من db.json المباشر
export const getDoctors = async () => {
  try {
    const response = await fetch("/db.json");
    if (!response.ok) throw new Error("Failed to fetch doctors");
    const data = await response.json();
    return { data: data.doctors || [] };
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

// جلب طبيب واحد بحسب الـ ID
export const getDoctor = async (id) => {
  try {
    const response = await fetch("/db.json");
    if (!response.ok) throw new Error("Failed to fetch doctor");
    const data = await response.json();
    const doctor = (data.doctors || []).find((d) => String(d.id) === String(id));

    if (!doctor) throw new Error("Doctor not found");
    return { data: doctor };
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw error;
  }
};

// --- إدارة المواعيد (Appointments) باستخدام localStorage ---

const getStoredAppointments = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("appointments");
  return stored ? JSON.parse(stored) : [];
};

const saveAppointments = (appointments) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }
};

// جلب جميع المواعيد
export const getAppointments = async () => {
  const appointments = getStoredAppointments();
  return { data: appointments };
};

// إنشاء موعد جديد
export const createAppointment = async (appointmentData) => {
  const appointments = getStoredAppointments();
  const newAppointment = {
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    ...appointmentData,
  };

  const updated = [newAppointment, ...appointments];
  saveAppointments(updated);
  return { data: newAppointment };
};

// تعديل موعد
export const updateAppointment = async (id, appointmentData) => {
  const appointments = getStoredAppointments();
  let updatedAppointment = null;

  const updated = appointments.map((app) => {
    if (String(app.id) === String(id)) {
      updatedAppointment = { ...app, ...appointmentData };
      return updatedAppointment;
    }
    return app;
  });

  saveAppointments(updated);
  return { data: updatedAppointment };
};

// حذف موعد
export const deleteAppointment = async (id) => {
  const appointments = getStoredAppointments();
  const filtered = appointments.filter((app) => String(app.id) !== String(id));
  saveAppointments(filtered);
  return { data: null };
};
