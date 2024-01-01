export const prefix = process.env.NODE_ENV === "production" ? "prod-" : "dev-";

export const stripeApiKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
