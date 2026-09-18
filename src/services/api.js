import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Get all doctors
export const getDoctors = async () => {
  const { data, error } = await supabase.from("doctors").select("*");

  if (error) throw error;

  return { data };
};

// Get one doctor
export const getDoctor = async (id) => {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return { data };
};

// Get all appointments
export const getAppointments = async () => {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return { data };
};

// Create appointment
export const createAppointment = async (data) => {
  const { data: appointment, error } = await supabase
    .from("appointments")
    .insert([{ data }])
    .select()
    .single();

  if (error) throw error;

  return { data: appointment };
};

// Update appointment
export const updateAppointment = async (id, data) => {
  const { data: appointment, error } = await supabase
    .from("appointments")
    .update({ data })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return { data: appointment };
};

// Delete appointment
export const deleteAppointment = async (id) => {
  const { error } = await supabase.from("appointments").delete().eq("id", id);

  if (error) throw error;

  return { data: null };
};

export default supabase;
