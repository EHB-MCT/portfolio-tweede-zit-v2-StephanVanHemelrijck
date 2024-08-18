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

module.exports = app;

// Start the server only if this file is run directly (not during testing)
if (require.main === module) {
  const PORT = process.env.APPLICATION_PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
