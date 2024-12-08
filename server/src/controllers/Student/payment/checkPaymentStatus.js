import { lookForCheckoutRequestId } from "../../../helpers/Payments/callBackHelpers.js";

export const checkStudentPaymentStatusFromCallback = async (req, res) => {
  const { checkoutRequestID } = req.params;

  try {
    const payment = await lookForCheckoutRequestId(checkoutRequestID);

    if (!payment) {
      res.status(404).json({
        message: `Payment with checkoutRequestId ${checkoutRequestID} not found`,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: payment.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
