import axios from "axios";
import { PrismaClient } from "@prisma/client";
import {
  generatePassword,
  getTimestamp,
} from "../../../helpers/Payments/paymentsFunctions.js";

const client = new PrismaClient();

const stkSimulate = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const { phoneNumber, amount, courseId } = req.body;
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
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "Test",
        TransactionDesc: "Payment of X",
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (response.data.ResponseCode !== "0") {
      res.status(400).json({
        message: "Failed to initiate stk push request",
      });
      return;
    }

    await client.payment.create({
      data: {
        amount: amount.toString(), // Ensure amount is a string
        status: "requested",
        courseId,
        CheckoutRequestID: response.data.CheckoutRequestID,
        userId,
        phoneNumber,
      },
    });

    res.status(200).json({
      sucess: true,
      CheckoutRequestID: response.data.CheckoutRequestID,
      message:
        "stk push request sent successfully. Enter pin to complete transaction",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default stkSimulate;
