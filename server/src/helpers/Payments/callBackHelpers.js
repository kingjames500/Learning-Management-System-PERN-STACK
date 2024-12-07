import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

export const lookForCheckoutRequestId = async (checkoutRequestId) => {
  const payment = await client.payment.findUnique({
    where: {
      CheckoutRequestID: checkoutRequestId,
    },
  });

  console.log(firstPayment, "from look for checkout request id");

  return payment;
};
