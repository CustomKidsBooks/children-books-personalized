import { Request, Response } from "express";
import { AppDataSource } from "../db/connect";
import { Order } from "../entities/order";
import { Book } from "../entities/book";
import axios from "axios";
import { getAccessTokenFromLulu } from "../service/lulu.service";

const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

export const OrderController = {
  getPrintJobEstimatedCost: async (req: Request, res: Response) => {
    try {
      const {
        pageCount,
        podPackageId,
        quantity,
        city,
        countryCode,
        postalCode,
        state,
        streetAddress,
        shippingLevel,
        phoneNumber,
      } = req.body;

      const access_token = await getAccessTokenFromLulu();

      const response = await axios.post(
        "https://api.lulu.com/print-job-cost-calculations/",
        {
          line_items: [
            {
              page_count: pageCount,
              pod_package_id: podPackageId,
              quantity: quantity,
            },
          ],
          shipping_address: {
            city: city,
            country_code: countryCode,
            postcode: postalCode,
            state_code: state,
            street1: streetAddress,
            phone_number: phoneNumber,
          },
          shipping_level: shippingLevel,
        },
        {
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(200).json({ costs: response.data });
    } catch (error: any) {
      if (error?.response.data?.shipping_address?.detail?.errors) {
        return res.status(500).json({
          shippingDetails:
            error?.response.data?.shipping_address?.detail?.errors,
        });
      }
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
  },

  createCheckoutSession: async (req: Request, res: Response) => {
    try {
      const {
        bookID,
        userID,
        totalAmount,
        quantity,
        bookData,
        podPackageId,
        email,
        name,
        city,
        countryCode,
        phoneNumber,
        postalCode,
        stateCode,
        streetAddress,
        shippingLevel,
      } = req.body;
      const orderRepository = AppDataSource.getRepository(Order);
      const newOrder = new Order();

      newOrder.userID = userID;
      newOrder.book = bookID;
      newOrder.paymentStatus = "processing";
      newOrder.orderTotal = totalAmount;
      newOrder.coverUrl =
        "https://www.dropbox.com/s/7bv6mg2tj0h3l0r/lulu_trade_perfect_template.pdf?dl=1&raw=1";
      newOrder.interiorUrl =
        "https://www.dropbox.com/s/r20orb8umqjzav9/lulu_trade_interior_template-32.pdf?dl=1&raw=1";
      newOrder.podPackageId = podPackageId;

      newOrder.printJobId = 0;

      const savedOrder = await orderRepository.save(newOrder);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        client_reference_id: savedOrder?.id,
        line_items: [
          {
            price_data: {
              currency: "USD",
              unit_amount: totalAmount * 100,
              product_data: {
                name: bookData.title,
                description: bookData.subject,
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
            coverUrl: savedOrder?.coverUrl,
            interiorUrl: savedOrder?.interiorUrl,
            podPackageId: savedOrder?.podPackageId,
            quantity: quantity,
            title: bookData.title,
            name: name,
            streetAddress: streetAddress,
            city: city,
            stateCode: stateCode,
            countryCode: countryCode,
            postalCode: postalCode,
            email: email,
            phoneNumber: phoneNumber,
            shippingLevel: shippingLevel,
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
    } catch (err) {
      if (err instanceof Error) {
        response.status(400).send(`Webhook Error: ${err.message}`);
      }
      return;
    }

    let orderID;
    let userID;

    switch (event.type) {
      case "charge.succeeded":
        break;
      case "checkout.session.completed":
        break;
      case "payment_intent.created":
        break;
      case "payment_intent.succeeded":
        orderID = event.data.object.metadata.oderID;
        userID = event.data.object.metadata.userID;
        let coverUrl = event.data.object.metadata.coverUrl;
        let interiorUrl = event.data.object.metadata.interiorUrl;
        let podPackageId = event.data.object.metadata.podPackageId;
        let title = event.data.object.metadata.title;
        let name = event.data.object.metadata.name;
        let streetAddress = event.data.object.metadata.streetAddress;
        let city = event.data.object.metadata.city;
        let stateCode = event.data.object.metadata.stateCode;
        let countryCode = event.data.object.metadata.countryCode;
        let postalCode = event.data.object.metadata.postalCode;
        let email = event.data.object.metadata.email;
        let quantity = event.data.object.metadata.quantity;
        let phoneNumber = event.data.object.metadata.phoneNumber;
        let shippingLevel = event.data.object.metadata.shippingLevel;

        await AppDataSource.createQueryBuilder()
          .update(Order)
          .set({ paymentStatus: "Paid" })
          .where("id = :id", { id: orderID })
          .execute();

        const access_token = await getAccessTokenFromLulu();

        const response = await axios.post(
          "https://api.lulu.com/print-jobs/",
          {
            contact_email: email,
            external_id: orderID,
            line_items: [
              {
                external_id: orderID,
                printable_normalization: {
                  cover: {
                    source_url: `${coverUrl}`,
                  },
                  interior: {
                    source_url: `${interiorUrl}`,
                  },
                  pod_package_id: `${podPackageId}`,
                },
                quantity: quantity,
                title: title,
              },
            ],
            production_delay: 120,
            shipping_address: {
              city: city,
              country_code: countryCode,
              name: name,
              phone_number: phoneNumber,
              postcode: postalCode,
              state_code: stateCode,
              street1: streetAddress,
            },
            shipping_level: shippingLevel,
          },
          {
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data?.id) {
          await AppDataSource.createQueryBuilder()
            .update(Order)
            .set({ printJobId: response.data.id })
            .where("id = :id", { id: orderID })
            .execute();
        }

        break;
      default:
        orderID = event.data.object.metadata.oderID;
        userID = event.data.object.metadata.userID;
        await AppDataSource.createQueryBuilder()
          .update(Order)
          .set({ paymentStatus: "Error" })
          .where("id = :id", { id: orderID })
          .execute();
    }

    response.status(200).send().end();
  },
};
