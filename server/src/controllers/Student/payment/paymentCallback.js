import { PrismaClient } from "../../../imports/imports.js";

const client = new PrismaClient();

const paymentCallback = async (req, res) => {
  console.log("call back url hit from our server");
  const callBackData = req.body;
  console.log(callBackData);
  console.log(callBackData.body.stkCallback.ResultCode);
  try {
    console.log(callBackData.body.stkCallback.CallbackMetadata);

    const amount = callBackData.body.stkCallback.CallbackMetadata.Item[0].Value;
    const phoneNumber =
      callBackData.body.stkCallback.CallbackMetadata.Item[4].Value;
    const mpesaReceiptNumber =
      callBackData.body.stkCallback.CallbackMetadata.Item[1].Value;
    const resultCode = callBackData.body.stkCallback.ResultCode;

    console.log(resultCode);

    // if (resultCode === 0) {
    //   await client.payment.update({
    //     where: {
    //       mpesaReceiptNumber,
    //     },
    //     data: {
    //       status: "paid",
    //       amount,
    //       phoneNumber,
    //     },
    //   });
    // }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    return;
  }
};

export default paymentCallback;
