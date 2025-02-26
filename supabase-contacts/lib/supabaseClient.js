import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://lvagujspwtzzdhfsrzfy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2YWd1anNwd3R6emRoZnNyemZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1ODIzNDgsImV4cCI6MjA1NjE1ODM0OH0.Vg8_SJSVyQRoDQU6Jgm8IMKflyDRDmWNFwK9VMoWVOM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
