const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chartRoutes = require("./routes/chartRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const chartLayoutRoutes = require("./routes/chartLayoutRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

dotenv.config({ path: path.join(__dirname, ".env"), quiet: true });

const app = express();
const configuredClientUrls = (process.env.CLIENT_URL || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  const localAllowedOrigins = [
    ...configuredClientUrls,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
  ];

  return (
    localAllowedOrigins.includes(origin) ||
    /^http:\/\/(localhost|127\.0\.0\.1):517[3-9]$/.test(origin) ||
    /^http:\/\/(localhost|127\.0\.0\.1):518\d$/.test(origin)
  );
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/charts", chartRoutes);
app.use("/api/chart-layouts", chartLayoutRoutes);
app.use("/api/watchlists", watchlistRoutes);
app.use(errorMiddleware);

async function startServer() {
  await connectDB();
  const port = process.env.PORT || 5000;

  return app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { app, startServer };
