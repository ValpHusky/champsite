import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = process.env.REACT_APP_SUPABASEURL!;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASEKEY!;

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
