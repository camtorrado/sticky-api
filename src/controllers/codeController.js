const supabase = require('../config/supabase');

async function generateUniqueCode() {
  let isUnique = false;
  let code;

  while (!isUnique) {
    code = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const { data, error } = await supabase
      .from('records')
      .select('number')
      .eq('number', code);

    if (error) {
      throw new Error('Error checking the database');
    }

    if (data.length === 0) {
      isUnique = true;
    }
  }

  return code;
}

exports.getCode = async (req, res) => {
  const { quantity } = req.query;
  const quantityNumber = parseInt(quantity, 10);

  if (!quantityNumber || quantityNumber <= 0) {
    return res.status(400).json({ error: 'Quantity must be a positive integer' });
  }

  try {
    const codes = new Set();

    while (codes.size < quantityNumber) {
      const code = await generateUniqueCode();
      codes.add(code);
    }

    res.json({ codes: Array.from(codes) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating unique codes' });
  }
};
