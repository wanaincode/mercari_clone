// routes/itemRoutes.js
import express from "express";
import Item from "../models/item.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * GET /api/items/me - get items of the logged-in user
 */
router.get("/me", verifyToken, async (req, res) => {
  try {
    const items = await Item.find({ seller: req.user.id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/items - get all items (public)
 */
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }).populate("seller", "name email");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/items/:id - get single item (public)
 */
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("seller", "name email");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * POST /api/items - create a new item (auth required)
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;
    if (!title || price == null) {
      return res.status(400).json({ message: "title and price are required" });
    }
    const seller = req.user.id; // from JWT
    const newItem = new Item({ title, description, price, imageUrl, seller });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * PUT /api/items/:id - update item (owner only)
 */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE /api/items/:id - delete item (owner only)
 */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await item.deleteOne();
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;