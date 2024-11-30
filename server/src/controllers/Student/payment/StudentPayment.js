import axios from "axios";
import { PrismaClient } from "@prisma/client";
import {
  generatePassword,
  getTimestamp,
} from "../../../helpers/Payments/paymentsFunctions.js";

const client = new PrismaClient();
// stk
const stkSimulate = async (req, res) => {
  const userId = req.userId;
  const courseId = req.params;
  const { phoneNumber, amount } = req.body;
  const access_token = req.access_token;
  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: 174379,
        Timestamp: getTimestamp(),
        Password: generatePassword(),
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: `254${phoneNumber}`,
        PartyB: 174379,
        PhoneNumber: `254${phoneNumber}`,
        CallBackURL: "https://883e-102-7-122-90.ngrok-free.app/callback",
        AccountReference: "CompanyXLTD",
        TransactionDesc: "Payment of X",
      },

      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    console.log(response.data.ResponseCode);
    res.status(200).json(response.data);

    if (response.data.ResponseCode === 0) {
      console.log("Success");
      const savepayment = await client.payment.create({
        data: {
          amount: amount,
          phoneNumber: phoneNumber,
          courseId: courseId,
          userId: userId,
        },
      });

      res.status(200).json({
        message: "Payment successful",
        payments: savepayment,
      });
    } else {
      res.status(400).json({
        message: "Payment failed",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.response?.data || error.message });
    return;
  }
};

export default stkSimulate;
