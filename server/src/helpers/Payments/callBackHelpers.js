import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

export const lookForCheckoutRequestId = async (checkoutRequestId) => {
  const payment = await client.payment.findUnique({
    where: {
      CheckoutRequestID: checkoutRequestId,
    },
  });

  return payment;
};

// updating the payment status to paid and adding the mpesa receipt number, amount and phone number
export const updatePaymentOnRecievingCallbackResponse = async (
  payment,
  mpesaReceiptNumber,
  amount,
) => {
  try {
    const paymentToUpdate = await client.payment.update({
      where: {
        CheckoutRequestID: payment.CheckoutRequestID,
      },
      data: {
        status: "paid",
        mpesaReceiptNumber,
        amount: amount.toString(),
      },
    });
    console.log("payment updated from the callback helpers", paymentToUpdate);
    return paymentToUpdate;
  } catch (error) {
    console.log("Error from updte payment on callback helpers", error);
    return;
  }
};

// updating the payment status to failed

export const updatePaymentOnFailure = async (payment) => {
  try {
    const paymentToUpdate = await client.payment.update({
      where: {
        CheckoutRequestID: payment.CheckoutRequestID,
      },
      data: {
        status: "rejected",
      },
    });
    console.log("payment updated from the callback helpers", paymentToUpdate);
    return paymentToUpdate;
  } catch (error) {
    console.log("Error from updte payment on callback helpers", error);
    return;
  }
};
