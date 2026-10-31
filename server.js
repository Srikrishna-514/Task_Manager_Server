const express = require("express");
const authRoute = require("./routers/authRoutes.js");
const userRoute = require("./routers/userRoutes.js");
const managerRoute = require("./routers/managersRoutes.js");
const employeeRoutes = require("./routers/employeeRoutes.js");
const connectDB = require("./config/db.js");
const dns = require("node:dns");
const errorHandling = require("./middlewares/errorMiddleware.js");
const app = express();
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config;
connectDB();
//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use("/user/", userRoute);
app.use("/auth/", authRoute);
app.use("/manager", managerRoute);
app.use("/employee", employeeRoutes);
app.use("/", (req, res) => {
  res.status(403).json({ message: "its default Api" });
});

app.use(errorHandling);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("server is running on port " + port);
});
