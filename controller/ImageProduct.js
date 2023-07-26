var ImageProduct = require("../models").ImageProduct;

exports.create = (req, res) => {
  ImageProduct.create(req.body)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findall = (req, res) => {
  ImageProduct.findAll()
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findallproduct = (req, res) => {
    // console.log("req",req.query.productId);
    var productId = req.query.productId;
    ImageProduct.findAll({
        where: { productId: productId },
        order: [["id", "ASC"]],
      })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  };
exports.findone = (req, res) => {
  ImageProduct.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  ImageProduct.destroy({ where: { ProductId: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  ImageProduct.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
