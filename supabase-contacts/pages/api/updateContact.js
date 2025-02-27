import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, name, number } = req.body;
  console.log("📩 Received Update Request:", { id, name, number });

  if (!id || !name || !number) {
    return res.status(400).json({ error: "ID, Name, and Number are required" });
  }

  // Convert ID to number if necessary
  const numericId = parseInt(id, 10);
  console.log("🔢 Converted ID:", numericId);

  const { data, error } = await supabase
    .from("contacts")
    .update({ Name: name, Number: number })
    .eq("id", numericId)
    .select();

  console.log("🔍 Supabase Update Result:", { data, error });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "No matching contact found" });
  }

  return res.status(200).json(data[0]);
}
