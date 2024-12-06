import stkSimulate from "../../../controllers/Student/payment/StudentPayment.js";
import paymentCallback from "../../../controllers/Student/payment/paymentCallback.js";
import { generateToken } from "../../../helpers/Payments/paymentsFunctions.js";

import { Router, verifyAuthToken } from "../../../imports/imports.js";

const router = Router();

router.post("/student/course/payment", generateToken, stkSimulate);

router.post("/callback", paymentCallback);

export default router;
