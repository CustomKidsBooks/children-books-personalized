import { Request, Response } from "express";
import { AppDataSource } from "../db/connect";
import { Order } from "../entities/order";
import { Book } from "../entities/book";

const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

export const OrderController = {
  createCheckoutSession: async (req: Request, res: Response) => {
    try {
      const { bookID, userID, amount, bookData } = req.body;
      const orderRepository = AppDataSource.getRepository(Order);
      const newOrder = new Order();

      newOrder.userID = userID;
      newOrder.book = bookID;
      newOrder.paymentStatus = "processing";
      newOrder.orderTotal = amount;

      const savedOrder = await orderRepository.save(newOrder);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        client_reference_id: savedOrder?.id,
        line_items: [
          {
            price_data: {
              currency: "USD",
              unit_amount: amount * 100,
              product_data: {
                name: "testOrder",
                description: "Print Book Order",
                images: [bookData.image],
              },
            },
            quantity: 1,
          },
        ],
        payment_intent_data: {
          metadata: {
            userID: userID,
            oderID: savedOrder?.id,
          },
        },
        success_url: `${process.env.FRONTEND_URL}/success-payment`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel-payment`,
      });

      return res.status(200).json({
        url: session,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
  },
  webHooks: async (request: Request, response: Response) => {
    // const sig = request.headers["stripe-signature"];

    const payload = request.body;
    const payloadString = JSON.stringify(payload, null, 2);

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret as string,
    });

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payloadString,
        header,
        endpointSecret as string
      );
      // console.log(`Webhook Verified: `, event);

      // event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      if (err instanceof Error) {
        response.status(400).send(`Webhook Error: ${err.message}`);
      }
      return;
    }

    // Handle the event
    switch (event.type) {
      case "charge.succeeded":
        break;
      case "checkout.session.completed":
        break;
      case "payment_intent.created":
        break;
      case "payment_intent.succeeded":
        const orderID = event.data.object.metadata.oderID;
        const userID = event.data.object.metadata.userID;

        await AppDataSource.createQueryBuilder()
          .update(Order)
          .set({ paymentStatus: "Paid" })
          .where("id = :id", { id: orderID })
          .execute();

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.status(200).send().end();
  },
};
