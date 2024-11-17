const loginAuthValidation = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).json({ message: "email is required" });
    return;
  }

  if (!password) {
    res.status(400).json({
      message: "password is required",
    });
    return;
  }

  next();
};

export default loginAuthValidation;
