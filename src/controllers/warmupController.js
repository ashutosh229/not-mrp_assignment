const warmup = (req, res) => {
  return res.json({
    success: true,
    message: "NOT@MRP Backend Running",
  });
};

export default warmup;
