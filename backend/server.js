// Import dependencies
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRouter.js";
import adminRoutes from "./routes/adminRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

// App Config
const app = express();
const port = process.env.PORT;
connectDB();
connectCloudinary();

// Middlewares
const allowedOrigins = ["http://localhost:5173"]; // Add your frontend URL(s) here

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder to serve images
app.use("/uploads", express.static("uploads"));

app.use("/api/admin", adminRoutes);
// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
