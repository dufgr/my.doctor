"use server";

import Stripe from "stripe";

import { protectedActionClient } from "@/lib/next-safe-action";
import { isStripeBillingEnabled } from "@/lib/stripe-config";

export const createStripeCheckout = protectedActionClient.action(
  async ({ ctx }) => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_ESSENTIAL_PLAN_PRICE_ID;
    if (!isStripeBillingEnabled() || !secretKey || !priceId) {
      throw new Error("Stripe billing is disabled");
    }
    const stripe = new Stripe(secretKey, {
      apiVersion: "2025-05-28.basil",
    });
    const { id: sessionId } = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      subscription_data: {
        metadata: {
          userId: ctx.user.id,
        },
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
    });
    return {
      sessionId,
    };
  },
);
