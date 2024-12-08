import { courseEnrollmentByStudent } from "../../../helpers/course/EnrollCourse.js";
import {
  lookForCheckoutRequestId,
  updatePaymentOnFailure,
  updatePaymentOnRecievingCallbackResponse,
} from "../../../helpers/Payments/callBackHelpers.js";

const paymentCallback = async (req, res) => {
  const callBackData = req.body;
  console.log(callBackData, "from callback data");

  try {
    const resultCode = callBackData.Body.stkCallback.ResultCode;
    const checkoutRequestId = callBackData.Body.stkCallback.CheckoutRequestID;
    const amount =
      callBackData.Body.stkCallback.CallbackMetadata?.Item[0]?.Value;
    const phoneNumber =
      callBackData.Body.stkCallback.CallbackMetadata?.Item[4]?.Value;
    const mpesaReceiptNumber =
      callBackData.Body.stkCallback.CallbackMetadata?.Item[1]?.Value;
    if (!checkoutRequestId) {
      console.error("CheckoutRequestID is missing in callback data.");
      return res.status(400).json({ error: "Invalid callback data" });
    }

    const payment = await lookForCheckoutRequestId(checkoutRequestId);
    if (resultCode === 0) {
      console.log("endpoint with the correct resultCode", resultCode);
      if (!payment) {
        console.error("Payment not found for the given CheckoutRequestID.");
        return res.status(404).json({ error: "Payment not found" });
      }
      const updatedPayment = await updatePaymentOnRecievingCallbackResponse(
        payment,
        mpesaReceiptNumber,
        amount,
      );

      console.log("first updated payment on resultCode 0", updatedPayment);
      await courseEnrollmentByStudent(
        updatedPayment.userId,
        updatedPayment.courseId,
      );
    } else {
      const updatedPayment = await updatePaymentOnFailure(payment);
      console.log("payment updated on failure", updatedPayment);
      return;
    }
  } catch (error) {
    console.log(error, "from payment callback catch clause");
  }
};

export default paymentCallback;
