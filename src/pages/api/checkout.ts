import { NextApiRequest, NextApiResponse } from "next";
import { IBagItem } from "@/shared/interfaces";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

type ResponseData = {
  url: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { user, deliveryFees } = req.body;

    try {
      let line_items: any = [];

      user.items.map((item: IBagItem) => {
        line_items.push({
          quantity: 1,
          price_data: {
            currency: "MYR",
            product_data: {
              name: item.name,
              description: item.description,
            },
            unit_amount: (item.discountedPrice ?? item.originalPrice) * 100,
          },
        });
      });

      if (deliveryFees > 0) {
        line_items.push({
          quantity: 1,
          price_data: {
            currency: "MYR",
            product_data: {
              name: "Delivery Fees",
            },
            unit_amount: deliveryFees * 100,
          },
        });
      }

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        customer_email: user.email,
        success_url: `${req.headers.origin}/checkout?success=true`,
        cancel_url: `${req.headers.origin}/checkout?canceled=true`,
      });

      res.json({ url: session.url });
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
