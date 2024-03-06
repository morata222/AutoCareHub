const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

const generateToken = (id) => {
  const token = jwt.sign({ userId: id }, JWT_SECRET, {
    expiresIn: "3d",
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch {
    return null;
  }
};

const attachCookies = (res, id) => {
  const token = generateToken(id);
  const oneDay = 24 * 60 * 60 * 1000;

  res.cookie("token", token, {
    expires: new Date(Date.now() + oneDay),
    httpOnly: true,
  });
};

module.exports = { generateToken, verifyToken, attachCookies };
