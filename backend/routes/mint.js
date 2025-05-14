const express = require("express");
const router = express.Router();
const mintToken = require("../services/mintToken");

router.post("/", async (req, res) => {
  const { name, symbol } = req.body;
  try {
    const result = await mintToken(process.env.PRIVATE_KEY, name, symbol);
    res.json({ mint: result.mint });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
