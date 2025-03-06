import { createClient } from "@supabase/supabase-js";
import { config } from "./env";

export const supabase = createClient(
  config.NEXT_PUBLIC_SUPABASE_URL!,
  config.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
