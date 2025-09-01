const express = require("express")
const app = express()
const userRoute  = require("./routes/user");
const bookRoute  = require("./routes/book");
const cartRoute  = require("./routes/cart");



app.use(express.json()) 


app.use("/user", userRoute);
app.use("/book", bookRoute);
app.use("/cart", cartRoute);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});