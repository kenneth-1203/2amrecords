// Setting the node environment: "test", "development", "production"
const NODE_ENV = "production";

export const prefix = process.env.NODE_ENV === NODE_ENV ? "prod-" : "dev-";
export const stripeApiKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
export const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
