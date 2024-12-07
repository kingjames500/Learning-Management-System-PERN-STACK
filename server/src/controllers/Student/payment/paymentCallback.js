import { courseEnrollmentByStudent } from "../../../helpers/course/EnrollCourse.js";
import { lookForCheckoutRequestId } from "../../../helpers/Payments/callBackHelpers.js";
import { PrismaClient } from "../../../imports/imports.js";

const client = new PrismaClient();

// const paymentCallback = async (req, res) => {
//   console.log("call back url hit from our server");
//   const callBackData = req.body;
//   console.log("callbackData", callBackData);
//   console.log("Resultscode", callBackData.Body.stkCallback.ResultCode);
//   try {
//     const resultCode = callBackData.Body.stkCallback.ResultCode;
//     const checkoutRequestId = callBackData.Body.stkCallback.CheckoutRequestID;
//     const amount = callBackData.Body.stkCallback.CallbackMetadata.Item[0].Value;
//     const phoneNumber =
//       callBackData.Body.stkCallback.CallbackMetadata.Item[4].Value;
//     const mpesaReceiptNumber =
//       callBackData.Body.stkCallback.CallbackMetadata.Item[1].Value;

//     switch (resultCode) {
//       case 0:
//         const payment = await lookForCheckoutRequestId(checkoutRequestId);

//         if (payment) {
//           await client.payment.update({
//             where: {
//               CheckoutRequestID: checkoutRequestId,
//             },
//             data: {
//               status: "completed",
//               mpesaReceiptNumber,
//               amount,
//               phoneNumber,
//             },
//           });

//           await courseEnrollmentByStudent(payment.userId, payment.courseId);
//         }
//         break;
//       case 1032:
//         await client.payment.update({
//           where: { CheckoutRequestID: checkoutRequestId },
//           data: { status: "rejected" },
//         });
//         console.log(resultCode, "from switch case")
//         break;
//       case 2001:
//         await client.payment.update({
//           where: { CheckoutRequestID: checkoutRequestId },
//           data: { status: "rejected" },
//         });
//         break;
//       default:
//         await client.payment.update({
//           where: {CheckoutRequestID: checkoutRequestId },
//           data: { status: "rejected" },
//         });
//         console.log("the checkout from default clause",checkoutRequestId)
//         break;
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: "Internal server error",
//     });
//     return;
//   }
// };

const paymentCallback = async (req, res) => {
  const callBackData = req.body;

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

    if (resultCode === 0) {
      console.log("Payment successful:", checkoutRequestId);

      const payment = await lookForCheckoutRequestId(checkoutRequestId);
      if (payment) {
        await client.payment.update({
          where: {
            CheckoutRequestID: checkoutRequestId,
          },
          data: {
            status: "paid",
            mpesaReceiptNumber,
            amount,
            phoneNumber,
          },
        });

        // Enroll user in course
        await courseEnrollmentByStudent(payment.userId, payment.courseId);
      }
    } else {
      console.log(
        "Payment rejected:",
        checkoutRequestId,
        "ResultCode:",
        resultCode,
      );
      await client.payment.update({
        where: { CheckoutRequestID: checkoutRequestId },
        data: { status: "rejected" },
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in callback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default paymentCallback;
