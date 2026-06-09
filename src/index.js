const express = require("express");
const connectDb = require("./config/db");
const envObj = require("./config/env");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const todoRoute = require("./routes/todo");
const cors = require("cors");
const { verifyTransport, sendMail, sendWelcomingEmail } = require("./utils/email");



const app = express();
app.use(express.json());

app.use(
  cors({
   origin: "http://localhost:5173",
  }),
);


const port = envObj.port || 4000;


app.use("/api/auth", userRoute);
app.use("/api/product", productRoute);
app.use("/api/todo", todoRoute);


app.get("/", (req, res) => {
  res.send("Hi, welcome to Express js sjkbjskjckbqijok kjdvbjsdbcvdkj");
  res.send('Hy welcome to Express js');
});

connectDb();

verifyTransport(); // Call the function to verify the transporter when the server starts
//sendMail();




app.listen(port, () => {
  console.log(`Hello our server is running on port:${port}`);
});


