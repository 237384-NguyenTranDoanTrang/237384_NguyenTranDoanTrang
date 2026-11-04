const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(endpoint, options = {}) {
  const response = await fetch(
    `${API_URL}/api/devices${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    }
  );

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error("Phản hồi từ máy chủ không hợp lệ");
  }

  if (!response.ok) {
    throw new Error(
      result.message || "Có lỗi xảy ra khi gọi API"
    );
  }

  return result;
}

export const deviceApi = {
  // Lấy danh sách và tìm kiếm
  getAll: (search = "") =>
    request(
      search
        ? `?search=${encodeURIComponent(search)}`
        : ""
    ),

  // Xem chi tiết
  getById: (id) =>
    request(`/${encodeURIComponent(id)}`),

  // Thêm thiết bị
  create: (data) =>
    request("", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  // Cập nhật thiết bị
  update: (id, data) =>
    request(`/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  // Xóa thiết bị
  remove: (id) =>
    request(`/${encodeURIComponent(id)}`, {
      method: "DELETE"
    })
};
