function generateUniqueId(prefix = "") {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generatePart(length) {
    let part = "";
    for (let i = 0; i < length; i++) {
      part += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return part;
  }
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateString = `${year}${month}${day}`;
  const identifier = `${prefix}${dateString}_${generatePart(6)}_${generatePart(
    6
  )}`;
  return identifier;
}

module.exports = generateUniqueId;
