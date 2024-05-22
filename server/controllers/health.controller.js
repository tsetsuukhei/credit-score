export const healthCheck = async (req, res) => {
  try {
    res.json({
      health: "fine",
    });
  } catch (err) {
    console.log("hi");
    res.status(400).json({ error: err.message });
  }
};
