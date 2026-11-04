
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

### Backend

Sau khi hoàn thành Câu 3:

cd backend
npm install
npm start

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
