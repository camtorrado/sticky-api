const supabase = require('../config/supabase');

exports.createRecords = async (req, res) => {
  const { personId, codes } = req.body;

  if (!personId || !Array.isArray(codes) || codes.length === 0) {
    return res.status(400).json({ error: 'personId and a non-empty array of codes are required' });
  }

  try {
    const { data: existingRecords, error: selectError } = await supabase
      .from('records')
      .select('number')
      .in('number', codes);

    if (selectError) {
      console.error('Error checking records in Supabase:', selectError);
      return res.status(500).json({ error: 'Error checking records' });
    }

    const existingCodes = existingRecords.map(record => record.number);
    const newCodes = codes.filter(code => !existingCodes.includes(code));

    if (existingCodes.length > 0) {
      return res.status(400).json({ error: 'Some codes already exist in the database', existingCodes });
    }

    const records = newCodes.map(code => ({
      people_id: personId,
      number: code
    }));

    const { data, error } = await supabase
      .from('records')
      .insert(records);

    if (error) {
      console.error('Error saving records to Supabase:', error);
      return res.status(500).json({ error: 'Error saving records' });
    }

    res.json({ success: true, records: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating records' });
  }
};
