const errorController = (err, req, res, next) => {
  console.error("Unhandled error", err);
  res.status(500).json({ success: false, message: "Internal server error" });
};
