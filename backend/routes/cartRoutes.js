import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const cart = await Cart.create(req.body);
  res.json(cart);
});

router.get("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  res.json(cart);
});

export default router;
