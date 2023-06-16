const jwt = require("jsonwebtoken");

// --- token verification --- //
const VerifyToken = (req, res, next) => {
  //   const headers = req.headers[`authorization`];
  //   const token = headers.split(" ")[1];
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) {
    return res
      .status(404)
      .json({ message: "No token found!", status: "Error" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Invalid token!", status: "Error" });
    }
    req.id = user.id;
  });

  next();
};

module.exports = VerifyToken;
