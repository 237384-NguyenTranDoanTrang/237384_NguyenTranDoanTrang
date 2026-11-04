
const express = require("express");
const mongoose = require("mongoose");
const Device = require("../models/Device");

const router = express.Router();

const fields = [
  "deviceId", "name", "deviceType", "room",
  "brand", "model", "quantity", "status",
  "purchaseDate", "description"
];

const requiredFields = fields.filter(
  (field) => field !== "description"
);

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function validateInput(body, isCreate = false) {
  if (!body || typeof body !== "object" ||
      Array.isArray(body)) {
    return "Dữ liệu phải là một đối tượng JSON";
  }

  const keys = Object.keys(body);

  if (!keys.length) return "Không có dữ liệu cập nhật";

  const invalid = keys.filter((key) => !fields.includes(key));
  if (invalid.length) {
    return `Trường không hợp lệ: ${invalid.join(", ")}`;
  }

  if (isCreate) {
    const missing = requiredFields.filter(
      (key) => body[key] === undefined ||
        body[key] === null || body[key] === ""
    );
    if (missing.length) {
      return `Thiếu trường bắt buộc: ${missing.join(", ")}`;
    }
  }

  for (const key of keys) {
    const value = body[key];

    if (key === "quantity") {
      if (!Number.isInteger(value) || value < 0) {
        return "Số lượng phải là số nguyên không âm";
      }
    } else if (key === "purchaseDate") {
      if (typeof value !== "string" ||
          !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
          Number.isNaN(Date.parse(value)) ||
          new Date(value).toISOString().slice(0, 10) !== value) {
        return "Ngày mua phải có định dạng YYYY-MM-DD hợp lệ";
      }
    } else if (
      typeof value !== "string" ||
      (key !== "description" && !value.trim())
    ) {
      return `${key} phải là chuỗi không rỗng`;
    }
  }

  return null;
}

function handleError(res, error) {
  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Mã thiết bị đã tồn tại"
    });
  }

  if (error.name === "ValidationError" ||
      error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  console.error("Device API error:", error.message);

  return res.status(500).json({
    success: false,
    message: "Lỗi máy chủ hoặc cơ sở dữ liệu"
  });
}

// GET /api/devices?search=...
router.get("/", async (req, res) => {
  try {
    const search = req.query.search;

    if (search !== undefined &&
        (typeof search !== "string" || search.length > 100)) {
      return res.status(400).json({
        success: false,
        message: "Từ khóa tìm kiếm không hợp lệ"
      });
    }

    const keyword = (search || "").trim();
    const filter = keyword ? {
      $or: ["deviceId", "name", "deviceType", "room"].map(
        (field) => ({
          [field]: {
            $regex: escapeRegex(keyword),
            $options: "i"
          }
        })
      )
    } : {};

    const devices = await Device.find(filter)
      .sort({ createdAt: -1, _id: -1 });

    res.status(200).json({
      success: true,
      count: devices.length,
      data: devices
    });
  } catch (error) {
    handleError(res, error);
  }
});

// GET /api/devices/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        success: false,
        message: "ID thiết bị không hợp lệ"
      });
    }

    const device = await Device.findById(id);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thiết bị"
      });
    }

    res.status(200).json({
      success: true,
      data: device
    });
  } catch (error) {
    handleError(res, error);
  }
});

// POST /api/devices
router.post("/", async (req, res) => {
  try {
    const errorMessage = validateInput(req.body, true);

    if (errorMessage) {
      return res.status(400).json({
        success: false,
        message: errorMessage
      });
    }

    const payload = { ...req.body };

    payload.deviceId = payload.deviceId.trim();

    const exists = await Device.exists({
      deviceId: payload.deviceId
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Mã thiết bị đã tồn tại"
      });
    }

    const device = await Device.create(payload);

    res.status(201).json({
      success: true,
      message: "Thêm thiết bị thành công",
      data: device
    });
  } catch (error) {
    handleError(res, error);
  }
});

// PUT /api/devices/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        success: false,
        message: "ID thiết bị không hợp lệ"
      });
    }

    const errorMessage = validateInput(req.body);

    if (errorMessage) {
      return res.status(400).json({
        success: false,
        message: errorMessage
      });
    }

    const payload = { ...req.body };

    if (payload.deviceId !== undefined) {
      payload.deviceId = payload.deviceId.trim();
    }

    const device = await Device.findByIdAndUpdate(
      id,
      { $set: payload },
      {
        new: true,
        runValidators: true
      }
    );

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thiết bị"
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật thiết bị thành công",
      data: device
    });
  } catch (error) {
    handleError(res, error);
  }
});

// DELETE /api/devices/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        success: false,
        message: "ID thiết bị không hợp lệ"
      });
    }

    const device = await Device.findByIdAndDelete(id);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thiết bị"
      });
    }

    res.status(200).json({
      success: true,
      message: "Xóa thiết bị thành công"
    });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
