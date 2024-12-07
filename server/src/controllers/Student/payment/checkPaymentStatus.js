import { lookForCheckoutRequestId } from "../../../helpers/Payments/callBackHelpers.js";
import { PrismaClient } from "../../../imports/imports.js";

const client = new PrismaClient();

export const checkStudentPaymentStatusFromCallback = async (req, res) => {
  const { checkoutRequestID } = req.body;

  try {
    const payment = await lookForCheckoutRequestId(checkoutRequestID);
    console.log(payment, "from check student payment status");
    if (!payment) {
      res
        .status(404)
        .json({
          message: `payment  with checkoutRequestId ${checkoutRequestID} not found`,
        });
      return;
    }
    res.status(200).json({
      success: true,
      message: payment.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
};
