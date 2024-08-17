const express = require("express");
const bodyParser = require("body-parser");

// Globals
const PORT = process.env.APPLICATION_PORT || 3000;

// Express app
const app = express();
const router = express.Router();

// Middleware
app.use(bodyParser.json());

// Routes
router.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Mount the router
app.use("/api", router);
app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(`Server is running on port ${PORT}`);
});
