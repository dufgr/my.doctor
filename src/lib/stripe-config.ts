const requiredStripeEnvironment = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_ESSENTIAL_PLAN_PRICE_ID",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL",
] as const;

export function isStripeBillingEnabled() {
  return (
    process.env.STRIPE_ENABLED === "true" &&
    requiredStripeEnvironment.every((key) => Boolean(process.env[key]))
  );
}
