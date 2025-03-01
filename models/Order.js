// backend/models/Order.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  shippingAddress: {  // Thêm thông tin địa chỉ giao hàng
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String }, // Có thể không bắt buộc, tùy quốc gia
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentInfo: { // Thêm thông tin thanh toán (tùy chọn)
    paymentMethod: { type: String }, // Ví dụ: "Credit Card", "PayPal", ...
    transactionId: { type: String }, // ID giao dịch (nếu có)
    // ...
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;