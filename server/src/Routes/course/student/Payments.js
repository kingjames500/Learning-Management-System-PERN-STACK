import stkSimulate from "../../../controllers/Student/payment/StudentPayment.js";
import { generateToken } from "../../../helpers/Payments/paymentsFunctions.js";
import { Router } from "../../../imports/imports.js";

const router = Router();

router.post("/student/payment", generateToken, stkSimulate);

export default router;
