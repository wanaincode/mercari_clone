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
    const user = await User.findById(req.user.id).select("-password"); // 不回傳密碼
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/items - get all items
 */
router.get("/", verifyToken, async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/items - create a new item
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;
    const seller = req.user.id; // JWT 內的 user id

    const newItem = new Item({ title, description, price, imageUrl, seller });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * PUT /api/items/:id - update item
 */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE /api/items/:id - delete item
 */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;