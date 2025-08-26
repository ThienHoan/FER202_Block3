// Ví dụ các config mapping khác nhau
// Copy và paste vào dataMapping.js để test

// 1. CONFIG CHO MOTORBIKE STORE
export const MOTORBIKE_MAPPING = {
  products: {
    id: 'id',
    title: 'model',                    // Winner X
    brand: 'brand',                    // Honda
    image: 'image',                    // /images/winnerx.jpg
    price: 'price',                    // $1500
    description: 'description',        // A sporty underbone motorbike...
    tags: [],                          // Không có tags
    year: 'year',                      // 2022
    stock: 'stock'                     // 10
  },
  
  accounts: {
    id: 'id',
    username: 'username',              // admin
    password: 'password',              // admin123
    fullName: 'username',              // admin
    accountType: 'account_type',       // admin
    status: 'status',                  // active
    // Không có email, secretQuestion, answer
  },
  
  orders: {
    id: 'id',
    userId: 'userId',
    items: 'items',
    total: 'total',
    date: 'date',
    status: 'status'
  }
};

// 2. CONFIG CHO LAPTOP STORE
export const LAPTOP_MAPPING = {
  products: {
    id: 'laptop_id',
    title: 'product_name',             // MacBook Pro
    brand: 'company',                  // Apple
    image: 'photo',                    // /images/macbook.jpg
    price: 'cost',                     // 1999
    description: 'product_description',
    tags: ['categories'],
    storage: 'storage_capacity',       // 512GB
    ram: 'memory',                     // 16GB
    processor: 'cpu',                  // M2 Pro
    screen: 'display_size',            // 14"
    battery: 'battery_life'            // 18h
  }
};

// 3. CONFIG CHO BOOK STORE
export const BOOK_MAPPING = {
  products: {
    id: 'book_id',
    title: 'book_title',               // Harry Potter
    brand: 'author',                   // J.K. Rowling
    image: 'cover_image',              // /images/harry.jpg
    price: 'book_price',               // 25
    description: 'book_description',
    tags: ['genres'],
    releaseDate: 'publication_date',   // 1997-06-26
    isbn: 'isbn_number',               // 978-0-7475-3269-6
    pages: 'page_count',               // 223
    language: 'language'               // English
  }
};

// 4. CONFIG CHO CLOTHING STORE
export const CLOTHING_MAPPING = {
  products: {
    id: 'item_id',
    title: 'item_name',                // T-Shirt
    brand: 'brand_name',               // Nike
    image: 'product_image',            // /images/tshirt.jpg
    price: 'item_price',               // 29.99
    description: 'item_description',
    tags: ['categories'],
    colors: 'available_colors',        // ['Red', 'Blue', 'Black']
    sizes: 'available_sizes',          // ['S', 'M', 'L', 'XL']
    material: 'fabric_type',           // Cotton
    gender: 'target_gender',           // Unisex
    season: 'season_type'              // Summer
  }
};

// 5. CONFIG CHO FOOD STORE
export const FOOD_MAPPING = {
  products: {
    id: 'dish_id',
    title: 'dish_name',                // Pho Bo
    brand: 'restaurant_name',          // Pho 24
    image: 'dish_photo',               // /images/pho.jpg
    price: 'dish_price',               // 45000
    description: 'dish_description',
    tags: ['cuisine_types'],
    calories: 'calorie_count',         // 350
    ingredients: 'ingredient_list',    // ['beef', 'rice noodles', 'herbs']
    spiceLevel: 'spice_rating',        // Medium
    preparationTime: 'cook_time',      // 15 minutes
    isVegetarian: 'vegetarian_friendly' // false
  }
};

// HƯỚNG DẪN SỬ DỤNG:
// 1. Copy config bạn muốn vào dataMapping.js
// 2. Thay đổi API_ENDPOINTS tương ứng
// 3. Restart ứng dụng
// 4. Dữ liệu sẽ tự động được normalize và hiển thị

// Ví dụ thay đổi API endpoints:
export const MOTORBIKE_ENDPOINTS = {
  products: '/motorbikes',             // Thay vì /products
  accounts: '/userAccounts',           // Thay vì /accounts
  orders: '/purchases'                 // Thay vì /orders
};
