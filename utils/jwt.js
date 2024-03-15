const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

const generateToken = (id, role) => {
  const token = jwt.sign({ userId: id, role }, JWT_SECRET, {
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

const attachCookies = (res, id, role) => {
  const token = generateToken(id, role);
  const oneDay = 24 * 60 * 60 * 1000;

  res.cookie("token", token, {
    expires: new Date(Date.now() + oneDay),
    httpOnly: true,
  });
};

module.exports = { generateToken, verifyToken, attachCookies };
