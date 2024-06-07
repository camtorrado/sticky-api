require("dotenv").config();

async function generateIntegrityHash(orderId, amount, currency) {
  const secretKey = process.env.TEST_SECRET_KEY;
  const data = `${orderId}${amount}${currency}${secretKey}`;

  const encodedText = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedText);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

module.exports = generateIntegrityHash;
