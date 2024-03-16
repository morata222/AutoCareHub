const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db/connect");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/not-found");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");
const productRoute = require("./routes/productRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect Database
connectDB();
const PORT = 8000;

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/products", productRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
