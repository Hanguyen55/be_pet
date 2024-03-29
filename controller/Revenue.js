var Revenue = require("../models").Revenue;
require("dotenv").config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
    console.log(req.body);
    Revenue.create(req.body)
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  };
  exports.update = (req, res) => {
    Revenue.update(req.body, { where: { id: req.params.id } })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  };