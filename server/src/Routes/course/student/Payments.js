import stkSimulate from "../../../controllers/Student/payment/StudentPayment.js";
import paymentCallback from "../../../controllers/Student/payment/paymentCallback.js";
import { generateToken } from "../../../helpers/Payments/paymentsFunctions.js";

import {
  Router,
  verifyAuthToken,
  checkStudentPaymentStatusFromCallback,
} from "../../../imports/imports.js";

const router = Router();
// route fro checking payment status

router.get(
  "/student/payment-status/:checkoutRequestID",
  verifyAuthToken,
  checkStudentPaymentStatusFromCallback,
);

// route for making stk push and payment
router.post(
  "/student/course/payment",
  generateToken,
  verifyAuthToken,
  stkSimulate,
);

// route for payment callback
router.post("/mpesa/callback", paymentCallback);

export default router;
