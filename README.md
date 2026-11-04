
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



### Hướng dẫn chạy Frontend

Công nghệ:
- React 19
- Vite 8
- JavaScript
- CSS

Yêu cầu:
- Node.js 24
- npm

#### Cài đặt

Di chuyển vào thư mục frontend:

```bash
cd frontend
```

Cài đặt thư viện:

```bash
npm install
```

Tạo file `.env.local` dựa trên `.env.example`.

Cấu hình địa chỉ Backend API:

```env
VITE_API_URL=http://localhost:5000
```

Khởi chạy frontend:

```bash
npm run dev
```

Trên PowerShell có thể sử dụng:

```powershell
npm.cmd run dev
```

Mặc định frontend sử dụng cổng 5173. Nếu cổng
đang được sử dụng, Vite có thể chọn cổng khác.

#### Chức năng frontend

- Hiển thị danh sách thiết bị từ MongoDB Atlas
- Xem chi tiết thiết bị
- Thêm thiết bị mới
- Cập nhật thông tin thiết bị
- Xóa thiết bị
- Tìm kiếm thiết bị
- Hiển thị tình trạng thiết bị
- Hiển thị trạng thái tải dữ liệu
- Thông báo thao tác thành công hoặc thất bại

#### Kiểm thử

```bash
npm run build
npm run lint
```

Địa chỉ Backend API được cấu hình thông qua
biến môi trường VITE_API_URL.

Khi triển khai lên Render, biến này phải được
cập nhật thành URL backend công khai.


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


## Câu 5. Đóng gói Backend bằng Docker

### Docker Hub
- Repository: 237384nguyentrandoantrang/backend
- Tag: latest
- Link: https://hub.docker.com/r/237384nguyentrandoantrang/backend

### Build Docker Image
```bash
cd backend
docker build -t 237384nguyentrandoantrang/backend:latest .
```

### Chạy Container
```bash
docker run -d --name backend-237384 --env-file .env -p 5001:5000 237384nguyentrandoantrang/backend:latest
```

### Kiểm thử
- Docker image build thành công.
- Container backend chạy trên cổng 5000.
- Máy chủ truy cập API qua cổng 5001.
- MongoDB Atlas kết nối thành công.
- GET /health trả về database connected.
- GET /api/devices trả về 3 thiết bị.

### Bảo mật
- File .env không được đóng gói vào Docker image.
- Các biến môi trường được truyền khi chạy container.


## Câu 6. Đóng gói Frontend bằng Docker

### Công nghệ
- React
- Vite
- Docker Multi-stage Build
- Node.js 24 Alpine
- Nginx Alpine

### Docker Hub
- Repository: 237384nguyentrandoantrang/frontend
- Tag: latest
- Link: https://hub.docker.com/r/237384nguyentrandoantrang/frontend

### Build image
```bash
cd frontend
docker build --build-arg VITE_API_URL=http://localhost:5001 -t 237384nguyentrandoantrang/frontend:latest .
```

### Chạy container
```bash
docker run -d --name frontend-237384 -p 8080:80 237384nguyentrandoantrang/frontend:latest
```

### Kiểm thử
- Frontend: http://localhost:8080
- Health: http://localhost:8080/health
- Backend API: http://localhost:5001/health
- Hiển thị thành công 3 thiết bị từ MongoDB Atlas.

### Lưu ý triển khai
VITE_API_URL là biến môi trường sử dụng tại thời điểm build.
Khi triển khai chính thức, cần build lại frontend với URL backend công khai.


## Câu 7. Triển khai Frontend lên Render

### Thông tin triển khai

- Nền tảng: Render
- Loại dịch vụ: Static Site
- Tên dịch vụ: web-237384
- Công nghệ: React, Vite
- Branch: main
- Root Directory: frontend
- Build Command: npm ci && npm run build
- Publish Directory: dist

### Đường dẫn ứng dụng

Frontend:
https://web-237384.onrender.com

Backend API:
https://api-237384.onrender.com

### Cấu hình môi trường

Key: VITE_API_URL

Value: https://api-237384.onrender.com

Biến VITE_API_URL được cấu hình trên Render
và sử dụng khi build ứng dụng React.

### Kết quả kiểm thử

- Frontend triển khai thành công.
- Website hoạt động trên Render.
- Kết nối Backend API thành công.
- Lấy dữ liệu từ MongoDB Atlas thành công.
- Hiển thị 3 thiết bị phòng học.
- Thống kê: 2 đang sử dụng, 1 đang sửa chữa.
- Không còn lỗi Failed to fetch.


## Câu 8. Triển khai Backend lên Render

### Cấu hình triển khai

- Platform: Render
- Service Type: Web Service
- Service Name: api-237384
- Runtime: Node.js
- Branch: main
- Root Directory: backend
- Build Command: npm ci
- Start Command: npm start

### Environment Variables

- NODE_ENV=production
- PORT=5000 (nếu được cấu hình)
- MONGODB_URI: cấu hình riêng trên Render

Không lưu mật khẩu hoặc MongoDB URI vào GitHub.

### Đường dẫn Backend

- API: https://api-237384.onrender.com
- Health: https://api-237384.onrender.com/health
- Devices: https://api-237384.onrender.com/api/devices

### Kết quả

- Backend chạy thành công trên Render.
- MongoDB Atlas kết nối thành công.
- API /health trả về database connected.
- Frontend trên Render lấy dữ liệu thành công.
- Hệ thống hiển thị 3 thiết bị.


## Câu 9. Kiểm thử tổng hợp và hoàn thiện hệ thống

### Thông tin sinh viên
- Họ tên: Nguyễn Trần Đoan Trang
- MSSV: 237384
- Môn: Điện toán đám mây
- Đề tài: Hệ thống quản lý thiết bị phòng học

### Đường dẫn bài thi

**GitHub:**
https://github.com/237384-NguyenTranDoanTrang/237384_NguyenTranDoanTrang

**Frontend Render:**
https://web-237384.onrender.com

**Backend Render:**
https://api-237384.onrender.com

**Backend Health:**
https://api-237384.onrender.com/health

**Backend Devices API:**
https://api-237384.onrender.com/api/devices

**Docker Hub Backend:**
https://hub.docker.com/r/237384nguyentrandoantrang/backend

**Docker Hub Frontend:**
https://hub.docker.com/r/237384nguyentrandoantrang/frontend

### MongoDB Atlas
- Cluster: Cluster0
- Database: 237384_NguyenTranDoanTrang
- Collection: devices

### Kết quả kiểm thử

- Frontend và backend triển khai thành công trên Render.
- Backend kết nối thành công MongoDB Atlas.
- API /health hoạt động.
- API /api/devices trả về dữ liệu thiết bị.
- Tìm kiếm, xem chi tiết, thêm, sửa, xóa thiết bị hoạt động.
- Hai Docker image được lưu trên Docker Hub.
- Mã nguồn và lịch sử commit được lưu trên GitHub.

### Bảo mật
Các thông tin bí mật được cấu hình bằng
biến môi trường, không lưu trong GitHub.
