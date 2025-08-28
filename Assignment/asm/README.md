# PhoneStore - React E-commerce Application

Ứng dụng thương mại điện tử React với các tính năng mua sắm, quản lý giỏ hàng, và hệ thống đăng nhập.

## 🚀 Tính năng chính

- **Hiển thị sản phẩm**: Grid layout responsive với tìm kiếm và sắp xếp
- **Quản lý giỏ hàng**: Thêm/xóa sản phẩm, cập nhật số lượng
- **Hệ thống đăng nhập**: Đăng nhập/đăng ký với validation
- **Quản lý yêu thích**: Thêm/xóa sản phẩm khỏi danh sách yêu thích
- **Thanh toán**: Trang checkout với form thông tin
- **Quản lý tài khoản**: Xem thông tin cá nhân và lịch sử đơn hàng
- **Stock management**: Cập nhật tồn kho real-time
- **Flexible data mapping**: Hỗ trợ nhiều cấu trúc dữ liệu khác nhau

## 🛠️ Công nghệ sử dụng

- **React 19.1.1** - UI Framework
- **React Router DOM 7.8.2** - Routing
- **React Bootstrap 2.10.10** - UI Components
- **Axios 1.11.0** - HTTP Client
- **JSON Server 1.0.0-beta.3** - Mock API
- **Vite 7.1.2** - Build Tool
- **PropTypes 15.8.1** - Type Checking

## 📋 Yêu cầu hệ thống

- Node.js >= 16.0.0
- npm >= 8.0.0 hoặc pnpm >= 7.0.0

## 🔧 Cài đặt

1. **Clone hoặc download dự án**
   ```bash
   # Nếu clone từ git
   git clone <repository-url>
   cd Assignment/asm
   
   # Hoặc giải nén file zip
   cd Assignment/asm
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   # hoặc
   pnpm install
   ```

3. **Khởi động JSON Server (Mock API)**
   ```bash
   npm run server
   # Server sẽ chạy tại http://localhost:5000
   ```

4. **Khởi động ứng dụng React**
   ```bash
   # Terminal mới
   npm run dev
   # App sẽ chạy tại http://localhost:5173
   ```

5. **Hoặc chạy cả hai cùng lúc**
   ```bash
   npm run dev:full
   ```

## 📁 Cấu trúc dự án

```
src/
├── components/          # React components
│   ├── Header.jsx      # Header navigation
│   ├── Footer.jsx      # Footer component
│   ├── ProductCard.jsx # Card hiển thị sản phẩm
│   ├── ProductGrid.jsx # Grid danh sách sản phẩm
│   ├── NavBar.jsx      # Thanh tìm kiếm/sắp xếp
│   └── HeroSlider.jsx  # Slider banner
├── pages/              # Page components
│   ├── HomePage.jsx    # Trang chủ
│   ├── LoginPage.jsx   # Trang đăng nhập
│   ├── RegisterPage.jsx # Trang đăng ký
│   ├── CartPage.jsx    # Trang giỏ hàng
│   ├── CheckoutPage.jsx # Trang thanh toán
│   └── ...
├── contexts/           # React Context
│   ├── AuthContext.jsx # Quản lý authentication
│   ├── CartContext.jsx # Quản lý giỏ hàng
│   ├── WishlistContext.jsx # Quản lý yêu thích
│   └── ToastContext.jsx # Quản lý thông báo
├── hooks/              # Custom hooks
│   ├── useAuth.js      # Hook authentication
│   ├── useCart.js      # Hook giỏ hàng
│   └── ...
├── services/           # API services
│   └── api.js          # Axios API calls
├── config/             # Configuration
│   └── dataMapping.js  # Data mapping config
├── utils/              # Utility functions
│   ├── price.js        # Price formatting
│   └── assets.js       # Asset URL resolution
└── App.jsx             # Root component
```

## 🔧 Cấu hình dữ liệu

Dự án sử dụng hệ thống mapping linh hoạt để hỗ trợ nhiều cấu trúc dữ liệu:

### Thay đổi cấu trúc dữ liệu

1. **Chỉnh sửa `src/config/dataMapping.js`**
   ```javascript
   export const DATA_MAPPING = {
     products: {
       id: 'id',           // ID field trong db.json
       title: 'name',      // Tên sản phẩm
       brand: 'category',  // Thương hiệu
       price: 'price',     // Giá
       image: 'image',     // Hình ảnh
       // ... thêm các field khác
     }
   };
   
   export const API_ENDPOINTS = {
     products: '/products',    // Endpoint API
     accounts: '/accounts',
     orders: '/orders'
   };
   ```

2. **Cập nhật `db.json`** theo cấu trúc mới

### Hỗ trợ các định dạng giá

- Số nguyên: `1500`
- Chuỗi với ký hiệu: `"$1500"`, `"1500 VND"`
- Định dạng phân cách: `"1,500"`, `"1.500"`

## 🚀 Tính năng nâng cao

### Flexible ID Handling
- Hỗ trợ ID dạng string và number
- Tự động chuyển đổi khi cần thiết

### Stock Management
- Cập nhật tồn kho real-time
- Sync với server khi thêm/xóa khỏi giỏ hàng

### Image URL Resolution
- Tự động resolve đường dẫn ảnh
- Hỗ trợ relative và absolute paths

### Lazy Loading
- Code splitting cho các trang
- Cải thiện performance

## 🐛 Troubleshooting

### Lỗi thường gặp

1. **"Cannot find module"**
   ```bash
   npm install
   # hoặc xóa node_modules và cài lại
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **"Port 5000 already in use"**
   ```bash
   # Tìm và kill process
   lsof -ti:5000 | xargs kill -9
   # hoặc đổi port trong package.json
   ```

3. **"API Error"**
   - Kiểm tra JSON Server đã chạy chưa
   - Kiểm tra `db.json` có đúng format không

### Debug

1. **Kiểm tra Console** (F12) để xem lỗi
2. **Kiểm tra Network tab** để xem API calls
3. **Kiểm tra `db.json`** có đúng format JSON không

## 📝 Scripts

```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm run preview      # Preview build
npm run server       # Chạy JSON Server
npm run dev:full     # Chạy cả React + JSON Server
npm run lint         # Kiểm tra code style
```

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được tạo cho mục đích học tập.

## 👨‍💻 Tác giả

- **Student Name** - *Initial work* - [YourName]

---

**Lưu ý**: Đảm bảo chạy `npm run server` trước khi chạy `npm run dev` để có dữ liệu API.