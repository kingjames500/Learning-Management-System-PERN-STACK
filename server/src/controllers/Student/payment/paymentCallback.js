import { courseEnrollmentByStudent } from "../../../helpers/course/EnrollCourse.js";
import { lookForCheckoutRequestId } from "../../../helpers/Payments/callBackHelpers.js";
import { PrismaClient } from "../../../imports/imports.js";

const client = new PrismaClient();

const paymentCallback = async (req, res) => {
  console.log("call back url hit from our server");
  const callBackData = req.body;
  console.log("callbackData", callBackData);
  console.log("Resultscode", callBackData.Body.stkCallback.ResultCode);
  try {
    console.log(
      "MetaData callback",
      callBackData.Body.stkCallback.CallbackMetadata,
    );

    const checkoutRequestId = callBackData.Body.stkCallback.CheckoutRequestID;
    const amount = callBackData.Body.stkCallback.CallbackMetadata.Item[0].Value;
    const phoneNumber =
      callBackData.Body.stkCallback.CallbackMetadata.Item[4].Value;
    const mpesaReceiptNumber =
      callBackData.Body.stkCallback.CallbackMetadata.Item[1].Value;

    const resultCode = callBackData.Body.stkCallback.ResultCode;
    let clientFeedback;

    switch (resultCode) {
      case 0:
        const payment = await lookForCheckoutRequestId(checkoutRequestId);

        if (payment) {
          await client.payment.update({
            where: {
              checkoutRequestId: checkoutRequestId,
            },
            data: {
              status: "completed",
              mpesaReceiptNumber,
              amount,
              phoneNumber,
            },
          });

          await courseEnrollmentByStudent(payment.userId, payment.courseId);
          clientFeedback =
            "Payment  and course enrollment was succesful 😊! You will be redirected to the course page shortly";
        } else {
          clientFeedback = "Payment not found be found😒";
        }
        break;
      case 1032:
        await client.payment.update({
          where: { checkoutRequestId: checkoutRequestId },
          data: { status: "rejected" },
        });
        clientFeedback = "Invalid payment details 😒";
        break;
      case 2001:
        await client.payment.update({
          where: { checkoutRequestId: checkoutRequestId },
          data: { status: "rejected" },
        });
        clientFeedback =
          "You do not have succiffient funds on your mpesa, please top up and pruchase the course 😒";
        break;
      default:
        await client.payment.update({
          where: { checkoutRequestId: checkoutRequestId },
          data: { status: "rejected" },
        });
        clientFeedback = "An error occured while processing your payment 😒";
        break;
    }
    console.log({
      success: true,
      message: clientFeedback,
    });

    res.status(200).json({
      success: true,
      message: clientFeedback,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    return;
  }
};

export default paymentCallback;
