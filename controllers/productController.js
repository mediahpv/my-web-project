// backend/controllers/productController.js
const fs = require('fs').promises; // Sử dụng fs.promises để dùng async/await
const path = require('path');

const productsFilePath = path.join(__dirname, '../products.json'); // Đường dẫn đến file products.json

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

// Hàm ghi dữ liệu vào file products.json (helper function)
const writeProductsFile = async (data) => {
    await fs.writeFile(productsFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// 1. Lấy danh sách tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
        const products = await readProductsFile();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 2. Lấy thông tin chi tiết của một sản phẩm (theo ID)
exports.getProductById = async (req, res) => {
    try {
        const products = await readProductsFile();
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 3. Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
    try {
        const products = await readProductsFile();
        const newProduct = req.body;

        // Validate data (kiểm tra dữ liệu đầu vào) - Rất quan trọng!
        if (!newProduct.name || !newProduct.price || !newProduct.description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Tạo ID mới cho sản phẩm (TẠM THỜI)
        newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

        // Thêm sản phẩm mới vào mảng
        products.push(newProduct);

        // Ghi dữ liệu vào file
        await writeProductsFile(products);

        res.status(201).json(newProduct); // Trả về sản phẩm mới (bao gồm cả ID)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 4. Cập nhật thông tin sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        const products = await readProductsFile();
        const productId = parseInt(req.params.id);
        const updatedProductData = req.body;

        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Cập nhật thông tin sản phẩm
        products[productIndex] = {
            ...products[productIndex], // Giữ lại các thông tin cũ
            ...updatedProductData,   // Ghi đè các thông tin mới
        };

        // Ghi dữ liệu vào file
        await writeProductsFile(products);

        res.json(products[productIndex]); // Trả về sản phẩm sau khi cập nhật

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 5. Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        const products = await readProductsFile();
        const productId = parseInt(req.params.id);

        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Xóa sản phẩm
        products.splice(productIndex, 1);

        // Ghi dữ liệu vào file
        await writeProductsFile(products);

        res.status(204).send(); // 204 No Content

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};