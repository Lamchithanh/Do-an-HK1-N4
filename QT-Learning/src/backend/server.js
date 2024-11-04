const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

// Import routes
const userRoutes = require("./routes/userRoutes.js");
const courseRoutes = require("./routes/courseRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const courseReviewsRoutes = require("./routes/courseReviewsRoutes");
const searchRoutes = require("./routes/courseRoutes");

const app = express();
const port = process.env.PORT || 9001;

// Cấu hình CORS
app.use(cors());

// Middleware để log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Middleware để phân tích dữ liệu JSON
app.use(bodyParser.json());

// Middleware để phục vụ tệp tĩnh từ thư mục assets/images
app.use("/assets", express.static("assets/images")); // Chỉ định thư mục chứa tệp tĩnh

// Routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", uploadRoutes);
app.use("/api", lessonRoutes);
app.use("/api", moduleRoutes);
app.use("/api", enrollmentRoutes);
app.use("/api", courseReviewsRoutes);
app.use("/api/courses", searchRoutes);

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

app.listen(port, () => {
  console.log(`Máy chủ đang chạy trên cổng ${port}`);
});
