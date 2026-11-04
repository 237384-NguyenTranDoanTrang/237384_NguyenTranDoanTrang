
# HỆ THỐNG QUẢN LÝ THIẾT BỊ PHÒNG HỌC

## 1. Thông tin sinh viên

- Họ và tên: Nguyễn Trần Đoan Trang
- MSSV: 237384
- Học phần: Điện toán đám mây

## 2. Giới thiệu đề tài

Xây dựng và triển khai hệ thống quản lý thiết bị phòng học trên nền tảng đám mây.

Hệ thống cho phép quản lý thông tin thiết bị, theo dõi tình trạng sử dụng và thực hiện các thao tác thêm, xem, tìm kiếm, cập nhật và xóa thiết bị.

## 3. Công nghệ sử dụng

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Quản lý mã nguồn: Git, GitHub
- Container: Docker, Docker Hub
- Cloud Deployment: Render

## 4. Cấu trúc dự án

- backend/: Backend REST API
- frontend/: Giao diện React
- README.md: Tài liệu hướng dẫn
- .gitignore: Danh sách tệp không đưa lên GitHub

## 5. Chức năng dự kiến

- Xem danh sách thiết bị
- Xem chi tiết thiết bị
- Thêm thiết bị
- Cập nhật thông tin thiết bị
- Xóa thiết bị
- Tìm kiếm thiết bị
- Theo dõi tình trạng thiết bị
- Kiểm tra API thông qua /health

## 6. Cơ sở dữ liệu

- Database: 237384_NguyenTranDoanTrang
- Collection: devices

## 7. Hướng dẫn cài đặt và chạy

Yêu cầu:
- Node.js và npm
- Git
- MongoDB Atlas


### Chạy Backend

Yêu cầu:
- Node.js 24
- npm
- MongoDB Atlas

Bước 1. Di chuyển vào thư mục backend:

```bash
cd backend
```

Bước 2. Cài đặt thư viện:

```bash
npm install
```

Bước 3. Tạo file .env dựa trên .env.example.

Cấu hình PORT và MONGODB_URI bằng thông tin
MongoDB Atlas thực tế.

Bước 4. Khởi chạy:

```bash
npm run dev
```

Trên PowerShell, có thể sử dụng npm.cmd run dev.

### API Backend

| Method | Endpoint | Chức năng |
|---|---|---|
| GET | /health | Kiểm tra backend và MongoDB |
| GET | /api/devices | Danh sách thiết bị |
| GET | /api/devices/:id | Chi tiết thiết bị |
| POST | /api/devices | Thêm thiết bị |
| PUT | /api/devices/:id | Cập nhật thiết bị |
| DELETE | /api/devices/:id | Xóa thiết bị |
| GET | /api/devices?search=... | Tìm kiếm thiết bị |

Backend mặc định chạy tại:

http://localhost:5000

Database: 237384_NguyenTranDoanTrang

Collection: devices

Lưu ý: Không đưa file .env hoặc mật khẩu lên GitHub.


### Frontend

Sau khi hoàn thành Câu 4:

cd frontend
npm install
npm run dev

Các lệnh chạy và biến môi trường sẽ được kiểm tra, cập nhật khi hoàn thiện mã nguồn.

## 8. Docker

Bổ sung hướng dẫn chạy backend và frontend bằng Docker tại Câu 5 và Câu 6.

## 9. Render

Bổ sung URL triển khai tại Câu 7 và Câu 8.

## 10. Liên kết bài nộp

GitHub:
https://github.com/237384-NguyenTranDoanTrang/237384_NguyenTranDoanTrang

Docker Backend: Chưa triển khai

Docker Frontend: Chưa triển khai

Render App: Chưa triển khai

Render API: Chưa triển khai

MongoDB Atlas: Chưa cấu hình

## 11. Bảo mật

- Không đưa file .env lên GitHub.
- Không công khai mật khẩu và access token.
- Sử dụng biến môi trường để lưu MongoDB URI.
- Không nhúng thông tin bí mật vào Docker image.
