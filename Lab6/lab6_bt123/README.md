# Lab 6: Redux

## 1. Ví dụ
- Counter (quản lý số đếm)
- Cart (giỏ hàng)
- Auth (đăng nhập)

## 2. Vì sao dùng Redux?
- Quản lý state tập trung
- Tránh props drilling
- Dễ debug với Redux DevTools
- Tối ưu cho ứng dụng lớn

## 3. So sánh
| Tiêu chí | Không dùng Redux | Dùng Redux |
|----------|------------------|------------|
| Quản lý state | useState, useContext, đơn giản | Store tập trung, dễ mở rộng |
| Chia sẻ dữ liệu | Truyền props nhiều cấp | Mọi component lấy từ store |
| Debug | Khó lần theo state | Redux DevTools dễ dàng |
| Hiệu quả | App nhỏ gọn nhẹ | App lớn maintain dễ hơn |

## 4. Kết luận
- App nhỏ: không cần Redux (dùng useState/useContext).
- App lớn: nên dùng Redux để dễ maintain, mở rộng và debug.
