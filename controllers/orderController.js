// backend/controllers/orderController.js

// TẠM THỜI: Lưu thông tin đơn hàng trong một mảng
const orders = [];
let nextOrderId = 1;

// 1. Lấy danh sách tất cả đơn hàng (thường chỉ dành cho admin)
exports.getAllOrders = (req, res) => {
  try {
    // TẠM THỜI: Trả về toàn bộ mảng orders
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 2. Lấy thông tin chi tiết của một đơn hàng (theo ID)
exports.getOrderById = (req, res) => {
  try {
    const orderId = parseInt(req.params.id);

    // Tìm order theo ID (TẠM THỜI)
    const order = orders.find(o => o.id === orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 3. Tạo đơn hàng mới
exports.createOrder = (req, res) => {
  try {
    const { userId, products } = req.body;

    // Validate data (kiểm tra dữ liệu đầu vào) - Rất quan trọng!
    if (!userId || !products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    // Tính tổng tiền (TẠM THỜI: Giả sử bạn có một hàm getProductById để lấy thông tin sản phẩm)
    let totalAmount = 0;
    for (const item of products) {
      // const product = getProductById(item.productId); // Bạn cần viết hàm này (hoặc lấy từ database)
      // if (!product) {
      //   return res.status(400).json({ message: `Product with ID ${item.productId} not found` });
      // }
      // totalAmount += product.price * item.quantity;

        // TẠM THỜI: Sử dụng dữ liệu từ file products.json
        const product = getProductById(item.productId)
        if (!product) {
            return res.status(400).json({ message: `Product with ID ${item.productId} not found` });
        }
         totalAmount += product.price * item.quantity;
    }


    // Tạo order mới (TẠM THỜI)
    const newOrder = {
      id: nextOrderId++,
      userId,
      products,
      totalAmount,
      status: 'pending', // Trạng thái mặc định
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);

    res.status(201).json(newOrder);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Giả sử ban đầu
// const products = [...]
// Hàm đọc từ file JSON
const fs = require('fs').promises;
const path = require('path');

const productsFilePath = path.join(__dirname, '../products.json');

// Hàm đọc dữ liệu từ file products.json (helper function)
const readProductsFile = async () => {
    try {
        const data = await fs.readFile(productsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') { // File not found
            return []; // Trả về mảng rỗng nếu file không tồn tại
        }
        throw error; // Nếu là lỗi khác, throw error
    }
};
// Hàm getProductById để lấy thông tin sản phẩm
const getProductById = async (productId) => {
    const products = await readProductsFile();
    const id = parseInt(productId)
    return products.find(p => p.id === id);
}


// 4. Cập nhật trạng thái đơn hàng (ví dụ: từ "pending" sang "shipped")
exports.updateOrderStatus = (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        const { status } = req.body;

        // Tìm order theo ID (TẠM THỜI)
        const order = orders.find(o => o.id === orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Cập nhật trạng thái
        order.status = status;

        res.json(order);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 5. Hủy đơn hàng
exports.cancelOrder = (req, res) => {
   try {
        const orderId = parseInt(req.params.id);

        // Tìm order theo ID (TẠM THỜI)
        const orderIndex = orders.findIndex(o => o.id === orderId);

        if (orderIndex === -1) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Xóa order (TẠM THỜI)
        orders.splice(orderIndex, 1);
        res.status(204).send();
   } catch (error) {
    console.error(error)
   }
};