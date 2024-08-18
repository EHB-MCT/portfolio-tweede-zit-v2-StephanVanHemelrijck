const express = require("express");

// Globals
const PORT = process.env.APPLICATION_PORT || 3000;

// Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/games", require("./routes/gameRoutes"));

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(`Server is running on port ${PORT}`);
});
