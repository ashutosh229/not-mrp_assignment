import Product from "../models/Product.js";

// http://localhost:5000/api/products
const listProducts = async (req, res) => {
  try {
    const businessId = req.user.id;
    const { q, category } = req.query;
    const filters = { businessId };
    if (q) filters.name = { $regex: q, $options: "i" };
    if (category) filters.category = category;
    const products = await Product.find(filters);
    return res.json({
      success: true,
      message: "Products are fetched successfully",
      data: products,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// http://localhost:5000/api/products
const createProduct = async (req, res) => {
  try {
    const businessId = req.user.id;
    const { name, description, price, stock, category } = req.body;
    if (!name || price == null)
      return res
        .status(400)
        .json({ success: false, message: "Name and price required" });
    const p = await Product.create({
      name,
      description,
      price,
      stock: stock || 0,
      category,
      businessId,
    });
    return res.json({
      success: true,
      message: "Product is created successfully",
      data: p,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// http://localhost:5000/api/products/68bb01b66e1e42bd19cec61b
const updateProduct = async (req, res) => {
  try {
    const businessId = req.user.id;
    const { id } = req.params;
    const update = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: id, businessId },
      update,
      { new: true }
    );
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    return res.json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// http://localhost:5000/api/products/68bb01b66e1e42bd19cec61b
const deleteProduct = async (req, res) => {
  try {
    const businessId = req.user.id;
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ _id: id, businessId });
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    return res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// http://localhost:5000/api/products/68bb023679315373360989a9/stock
const updateStock = async (req, res) => {
  try {
    const businessId = req.user.id;
    const { id } = req.params;
    const { delta } = req.body;
    const product = await Product.findOne({ _id: id, businessId });
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    product.stock = Math.max(0, (product.stock || 0) + Number(delta || 0));
    await product.save();
    return res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
};
