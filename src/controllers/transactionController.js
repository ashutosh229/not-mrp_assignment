import Transaction from "../models/Transaction.js";
import Product from "../models/Product.js";
import Contact from "../models/Contact.js";

const listTransactions = async (req, res) => {
  try {
    const businessId = req.user.id;
    const { type, from, to } = req.query;
    const filters = { businessId };
    if (type) filters.type = type;
    if (from || to) {
      filters.date = {};
      if (from) filters.date.$gte = new Date(from);
      if (to) filters.date.$lte = new Date(to);
    }
    const transactions = await Transaction.find(filters)
      .populate("products.productId")
      .populate("customerId vendorId");
    return res.json({
      success: true,
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const adjustStockForProducts = async (businessId, products, type) => {
  try {
    for (const item of products) {
      const product = await Product.findOne({
        _id: item.productId,
        businessId,
      });
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (type === "sale") {
        product.stock = Math.max(0, (product.stock || 0) - item.quantity);
      } else if (type === "purchase") {
        product.stock = (product.stock || 0) + item.quantity;
      }
      await product.save();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const createTransaction = async (req, res) => {
  try {
    const businessId = req.user.id;
    const { type, customerId, vendorId, products, date } = req.body;

    if (!["sale", "purchase"].includes(type))
      return res
        .status(400)
        .json({ success: false, message: "Invalid transaction type" });
    if (!Array.isArray(products) || products.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "Products required" });

    if (type === "sale" && !customerId)
      return res
        .status(400)
        .json({ success: false, message: "customerId required for sales" });
    if (type === "purchase" && !vendorId)
      return res
        .status(400)
        .json({ success: false, message: "vendorId required for purchases" });

    if (customerId) {
      const c = await Contact.findOne({ _id: customerId, businessId });
      if (!c)
        return res
          .status(400)
          .json({ success: false, message: "Invalid customer" });
    }
    if (vendorId) {
      const v = await Contact.findOne({ _id: vendorId, businessId });
      if (!v)
        return res
          .status(400)
          .json({ success: false, message: "Invalid vendor" });
    }

    let total = 0;
    const items = [];
    for (const it of products) {
      if (!it.productId || !it.quantity)
        return res.status(400).json({
          success: false,
          message: "productId and quantity required for each product item",
        });
      const product = await Product.findOne({ _id: it.productId, businessId });
      if (!product)
        return res.status(400).json({
          success: false,
          message: `Product ${it.productId} not found`,
        });
      const perPrice = it.price != null ? Number(it.price) : product.price;
      const qty = Number(it.quantity);
      total += perPrice * qty;
      items.push({ productId: it.productId, quantity: qty, price: perPrice });
    }

    const transaction = await Transaction.create({
      type,
      customerId: customerId || null,
      vendorId: vendorId || null,
      products: items,
      totalAmount: total,
      date: date ? new Date(date) : new Date(),
      businessId,
    });

    await adjustStockForProducts(businessId, items, type);

    return res.json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const inventoryReport = async (req, res) => {
  try {
    const businessId = req.user.id;
    const products = await Product.find({ businessId }).select(
      "name stock price category"
    );
    return res.json({
      success: true,
      message: "Inventory report fetched successfully",
      data: products,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const customerVendorHistory = async (req, res) => {
  try {
    const businessId = req.user.id;
    const { contactId } = req.params;
    if (!contactId)
      return res
        .status(400)
        .json({ success: false, message: "contactId required" });
    const transactions = await Transaction.find({
      businessId,
      $or: [{ customerId: contactId }, { vendorId: contactId }],
    }).populate("products.productId");
    return res.json({
      success: true,
      message: "Custom Vendor history fetched successfully",
      data: transactions,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  listTransactions,
  createTransaction,
  adjustStockForProducts,
  inventoryReport,
  customerVendorHistory,
};
