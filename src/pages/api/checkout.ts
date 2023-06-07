import { NextApiRequest, NextApiResponse } from "next";
import { IBagItem } from "@/shared/interfaces";
import { stripeSecretKey } from "@/api/config";

const stripe = require("stripe")(stripeSecretKey);

type ResponseData = {
  url: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { user, deliveryFees, orderId } = req.body;

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
        success_url: `${req.headers.origin}/checkout?orderId=${orderId}&success=true`,
        cancel_url: `${req.headers.origin}/checkout?orderId=${orderId}&canceled=true`,
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
