// Required environment variables (will throw an error if missing)
const requiredEnvVars = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
};

// Additional environment variables (optional)
const additionalEnvVars = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Next-Amplify",
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",
};

// Validate required environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const config = {
  // Required vars
  AUTH_SECRET: requiredEnvVars.NEXTAUTH_SECRET,
  NEXT_PUBLIC_SUPABASE_URL: requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: requiredEnvVars.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NODE_ENV: process.env.NODE_ENV || "development",
  NEXTAUTH_URL: requiredEnvVars.NEXTAUTH_URL,

  // Additional vars
  NEXT_PUBLIC_APP_NAME: additionalEnvVars.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_ENVIRONMENT: additionalEnvVars.NEXT_PUBLIC_ENVIRONMENT,
};
