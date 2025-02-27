import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name and Number are required" });
  }

  const { data, error } = await supabase
    .from("contacts")
    .insert([{ Name: name, Number: number }])
    .select(); // Ensures inserted data is returned

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Ensure data exists before returning
  if (!data || data.length === 0) {
    return res.status(500).json({ error: "No data returned from Supabase" });
  }

  return res.status(201).json(data[0]); // Return only the newly added contact
}
