const supabase = require("../config/supabase");

exports.createPerson = async (req, res) => {
  const { firstName, lastName, phoneNumber, city, email, orderId, quantity } = req.body;

  if (!firstName || !lastName || !phoneNumber || !email || !orderId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const { data, error } = await supabase
      .from("people")
      .insert([
        {
          firstname: firstName,
          lastname: lastName,
          phonenumber: phoneNumber,
          city: city,
          email: email,
          orderid: orderId,
          quantity: quantity
        },
      ])
      .select();

    if (error) {
      console.error("Error saving person to Supabase:", error);
      return res.status(500).json({ error: "Error saving person" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating person" });
  }
};
