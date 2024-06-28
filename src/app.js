require("dotenv").config();
import { SpeedInsights } from "@vercel/speed-insights/next"
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Import routes
const indexRoutes = require("./routes/index");
const orderRoutes = require("./routes/orderRoutes");
const peopleRoutes = require("./routes/peopleRoutes");
const codeRoutes = require('./routes/codeRoutes');
const recordsRoutes = require('./routes/recordsRoutes');

// use routes
app.use("/api", indexRoutes);
app.use("/api", orderRoutes);
app.use("/api", peopleRoutes);
app.use("/api", codeRoutes);
app.use("/api", recordsRoutes);

// Listen on port
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
