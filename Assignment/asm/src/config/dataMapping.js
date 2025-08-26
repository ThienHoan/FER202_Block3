// Data Mapping Configuration
// Đây là file config để map các trường dữ liệu
// Khi thay đổi dữ liệu, chỉ cần sửa file này

export const DATA_MAPPING = {
  // Mapping cho sản phẩm (products, motorbikes, laptops, books, etc.)
  products: {
    // Các trường cơ bản
    id: 'id',                           // ID sản phẩm
    title: 'model',                     // Tên sản phẩm: Winner X, Exciter 155, Raider R150, Liberty ABS
    brand: 'brand',                     // Thương hiệu: Honda, Yamaha, Suzuki, Piaggio
    image: 'image',                     // Hình ảnh: /images/winnerx.jpg, /images/exciter155.jpg
    price: 'price',                     // Giá gốc: $1500, $1700, $1400, $1800
    salePrice: 'salePrice',             // Giá sale (nếu có)
    description: 'description',         // Mô tả sản phẩm
    tags: [],                           // Không có tags cho motorbikes
    
    // Các trường mới có thể có
    stock: 'stock',                     // Số lượng tồn kho: 10, 8, 12, 5
    rating: 'rating',                   // Đánh giá sao
    year: 'year',                       // Năm sản xuất: 2022, 2023, 2021, 2020
    warranty: 'warranty',               // Bảo hành
    colors: 'colors',                   // Màu sắc
    storage: 'storage',                 // Dung lượng
    ram: 'ram',                         // RAM
    processor: 'processor',             // CPU
    screen: 'screen',                   // Màn hình
    battery: 'battery',                 // Pin
    camera: 'camera',                   // Camera
    weight: 'weight',                   // Trọng lượng
    dimensions: 'dimensions',           // Kích thước
    releaseDate: 'releaseDate',         // Ngày phát hành
    isAvailable: 'isAvailable',         // Còn hàng không
    isNew: 'isNew',                     // Sản phẩm mới
    isHot: 'isHot',                     // Sản phẩm hot
    isSale: 'isSale'                    // Đang giảm giá
  },
  
  // Mapping cho tài khoản (accounts, userAccounts, users, etc.)
  accounts: {
    // Các trường cơ bản
    id: 'id',                           // ID tài khoản
    username: 'username',               // Tên đăng nhập: admin, john, jane, guest
    email: 'email',                     // Email (không có trong dữ liệu mới)
    password: 'password',               // Mật khẩu: admin123, johnpass, janepass, guestpass
    fullName: 'username',               // Họ tên: dùng username làm default
    secretQuestion: 'secretQuestion',   // Câu hỏi bí mật (không có)
    answer: 'answer',                   // Câu trả lời (không có)
    
    // Các trường mới có thể có
    firstName: 'firstName',             // Tên
    lastName: 'lastName',               // Họ
    phone: 'phone',                     // Số điện thoại
    address: 'address',                 // Địa chỉ
    avatar: 'avatar',                   // Ảnh đại diện
    role: 'role',                       // Vai trò (user, admin, etc.)
    status: 'status',                   // Trạng thái: active, inactive
    accountType: 'account_type',        // Loại tài khoản: admin, user, guest
    createdAt: 'createdAt',             // Ngày tạo
    lastLogin: 'lastLogin',             // Lần đăng nhập cuối
    isVerified: 'isVerified',           // Đã xác thực chưa
    permissions: 'permissions'          // Quyền hạn
  },
  
  // Mapping cho đơn hàng (orders, purchases, transactions, etc.)
  orders: {
    // Các trường cơ bản
    id: 'id',                           // ID đơn hàng
    userId: 'userId',                   // ID người dùng
    items: 'items',                     // Danh sách sản phẩm
    total: 'total',                     // Tổng tiền
    date: 'date',                       // Ngày đặt hàng
    status: 'status',                   // Trạng thái đơn hàng
    
    // Các trường mới có thể có
    orderNumber: 'orderNumber',         // Số đơn hàng
    customerName: 'customerName',       // Tên khách hàng
    customerPhone: 'customerPhone',     // SĐT khách hàng
    customerAddress: 'customerAddress', // Địa chỉ giao hàng
    paymentMethod: 'paymentMethod',     // Phương thức thanh toán
    shippingMethod: 'shippingMethod',   // Phương thức vận chuyển
    shippingFee: 'shippingFee',         // Phí vận chuyển
    tax: 'tax',                         // Thuế
    discount: 'discount',               // Giảm giá
    notes: 'notes',                     // Ghi chú
    estimatedDelivery: 'estimatedDelivery', // Ngày giao hàng dự kiến
    actualDelivery: 'actualDelivery',   // Ngày giao hàng thực tế
    trackingNumber: 'trackingNumber'    // Mã vận đơn
  }
};

// API Endpoints mapping
export const API_ENDPOINTS = {
  // Endpoints cho sản phẩm
  products: '/Motorbikes',                // Thay đổi từ /products thành /Motorbikes
  
  // Endpoints cho tài khoản
  accounts: '/UserAccounts',              // Thay đổi từ /accounts thành /UserAccounts
  
  // Endpoints cho đơn hàng
  orders: '/orders'                       // Giữ nguyên
};

// Default values cho các trường có thể thiếu
export const DEFAULT_VALUES = {
  products: {
    title: 'Không có tên',
    brand: 'Không có thương hiệu',
    image: '/images/default.jpg',
    price: '$0',
    description: 'Không có mô tả',
    tags: [],
    stock: 0,
    rating: 0,
    year: new Date().getFullYear(),
    isAvailable: true,
    isNew: false,
    isHot: false,
    isSale: false
  },
  
  accounts: {
    fullName: 'Không có tên',
    role: 'user',
    status: 'active',
    accountType: 'user',
    isVerified: false
  },
  
  orders: {
    status: 'pending',
    shippingFee: 0,
    tax: 0,
    discount: 0
  }
};

// Helper function để lấy giá trị từ object theo mapping
export const getMappedValue = (data, mappingKey, entityType = 'products') => {
  const mapping = DATA_MAPPING[entityType];
  const defaultValue = DEFAULT_VALUES[entityType];
  
  if (!mapping || !mapping[mappingKey]) {
    return defaultValue?.[mappingKey] || null;
  }
  
  const fieldName = mapping[mappingKey];
  const value = data[fieldName];
  
  // Trả về default value nếu không có giá trị
  if (value === undefined || value === null) {
    return defaultValue?.[mappingKey] || null;
  }
  
  return value;
};

// Helper function để normalize toàn bộ object
export const normalizeData = (data, entityType = 'products') => {
  if (!data) return null;
  
  const normalized = {};
  const mapping = DATA_MAPPING[entityType];
  const defaults = DEFAULT_VALUES[entityType];
  
  // Map tất cả các trường
  Object.keys(mapping).forEach(key => {
    const fieldName = mapping[key];
    normalized[key] = data[fieldName] !== undefined ? data[fieldName] : (defaults?.[key] || null);
  });
  
  return normalized;
};
