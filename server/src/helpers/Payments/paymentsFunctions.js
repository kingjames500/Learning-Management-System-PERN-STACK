import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

// function for generating password
function generatePassword() {
  const shortcode = process.env.BUSINESS_SHORTCODE.trim();
  const passkey = process.env.MPESA_PASSKEY.trim();
  const timestamp = getTimestamp();
  const password = Buffer.from(shortcode + passkey + timestamp).toString(
    "base64",
  );
  return password;
}

// function for generating timestamp
function getTimestamp() {
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  return timestamp;
}

// function for generating acces token and that is used to authenticate the transaction request
const generateToken = async (req, res, next) => {
  const consumerkey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;
  const auth = Buffer.from(`${consumerkey}:${consumerSecret}`).toString(
    "base64",
  );

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      },
    );

    const access_token = response.data.access_token;
    req.access_token = access_token;

    next();
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    return;
  }
};

export { getTimestamp, generatePassword, generateToken };
