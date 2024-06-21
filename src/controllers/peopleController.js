// src/controllers/peopleController.js
const supabase = require("../config/supabase");

exports.createPerson = async (req, res) => {
  const { firstName, lastName, phoneNumber, city, email, orderId, quantity } =
    req.body;

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
          quantity: quantity,
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

exports.getPersonByOrderId = async (req, res) => {
  const { orderId } = req.params;

  try {
    const { data, error } = await supabase
      .from("people")
      .select("id, quantity")
      .eq("orderid", orderId);

    if (error) {
      console.error("Error fetching person by orderId:", error);
      return res
        .status(500)
        .json({ error: "Error fetching person by orderId" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json({ id:data[0].id, quantity:data[0].quantity });
  } catch (error) {
    console.error("Error fetching person by orderId:", error);
    res.status(500).json({ error: "Error fetching person by orderId" });
  }
};

exports.deletePersonById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("people")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error deleting person from Supabase:", error);
      return res.status(500).json({ error: "Error deleting person" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ error: "Error deleting person" });
  }
};