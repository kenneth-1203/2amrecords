export const prefix =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "prod-" : "dev-";

export const stripeApiKey =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    : process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY;

export const stripeSecretKey =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
    : process.env.NEXT_PUBLIC_STRIPE_TEST_SECRET_KEY;
