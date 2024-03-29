import { NextApiRequest, NextApiResponse } from "next";
import { IBagItem } from "@/shared/interfaces";
import { stripeSecretKey } from "@/api/config";
import { isDiscountExpired } from "@/shared/utils";

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
        const unit_amount = isDiscountExpired(item.discountExpiry)
          ? item.originalPrice
          : item.discountedPrice;
        line_items.push({
          quantity: 1,
          price_data: {
            currency: "MYR",
            product_data: {
              name: `${item.name} (Size ${item.size})`,
              description: item.description,
            },
            unit_amount: Number(unit_amount) * 100,
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

      const customer = await stripe.customers.create({
        name: user.fullName,
        phone: user.phoneNumber,
        email: user.email,
        address: {
          country: "MY",
          line1: user.addressLine1,
          line2: user.addressLine2,
          postal_code: user.postcode,
          state: user.state,
        },
      });

      const session = await stripe.checkout.sessions.create({
        line_items,
        customer: customer.id,
        mode: "payment",
        invoice_creation: {
          enabled: true,
        },
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
