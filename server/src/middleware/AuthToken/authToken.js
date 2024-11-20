import jwt from "jsonwebtoken";

function verifyAuthToken(req, res, next) {
  const { authToken } = req.cookies;

  if (!authToken) {
    res
      .status(401)
      .json({ message: "something went wrong! Please try again later" });
    return;
  }

  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized acces to this resource!" });
      return;
    }

    req.userId = decoded;

    next();
  });
}

export default verifyAuthToken;
