require("dotenv").config();
const generateUniqueId = require("../utils/generateUniqueId");
const generateIntegrityHash = require("../utils/hashUtils");

exports.createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    return res.status(400).json({ error: "Amount and currency are required" });
  }

  const orderId = generateUniqueId("ORD_");
  const identityKey = process.env.TEST_IDENTITY_KEY;

  try {
    const hash = await generateIntegrityHash(orderId, amount, currency);

    res.json({ success: true, orderId, hash, identityKey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating hash" });
  }
};
