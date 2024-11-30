import { prismaClient } from "../../../imports/imports.js";

const client = prismaClient();

const paymentCallback = async (req, res) => {
  console.log("call back url hit");
  const callBackData = req.body;
  try {
    if (!callBackData.body.stkCallback.CallbackMetadata) {
      console.log(callBackData.body);
      return res.json("ok");
    }
    console.log(callBackData.body.stkCallback.CallbackMetadata);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    return;
  }
};
