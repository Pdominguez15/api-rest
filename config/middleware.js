module.exports = (req, res, next) => {
  if (req.method === "POST") {
    req.body.image = "/api/assets/" + req.file.filename;
  }
  next();
};
