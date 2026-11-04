
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const deviceRoutes = require("./routes/deviceRoutes");

// 1. Khởi tạo ứng dụng Express
const app = express();
const PORT = process.env.PORT || 5000;

// 2. Cấu hình Middleware
app.use(cors());
app.use(express.json());

// 3. Đăng ký API quản lý thiết bị
app.use("/api/devices", deviceRoutes);

// 4. Trang chủ API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Classroom Device Management API",
    studentId: "237384",
    studentName: "Nguyen Tran Doan Trang"
  });
});

// 5. Kiểm tra trạng thái backend và MongoDB
app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    success: connected,
    status: connected ? "OK" : "DATABASE_UNAVAILABLE",
    database: connected ? "connected" : "disconnected"
  });
});

// 6. Xử lý API không tồn tại
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint không tồn tại"
  });
});

// 7. Khởi động backend
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
