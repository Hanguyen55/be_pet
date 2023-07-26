var PriceService = require("../models").PriceService;
var Weight = require("../models").Weight;
var Service = require("../models").Service;
require("dotenv").config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
    PriceService.create(req.body)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findall = (req, res) => {
    var page = req.query.page;
    var status = req.query.status;
    page = parseInt(page);
    let soLuongBoQua = (page - 1) * PAGE_SIZE;
    if (page || status) {
      if (page && !status) {
        PriceService.findAndCountAll({
          order: [["id", "DESC"]],
          offset: soLuongBoQua,
          limit: PAGE_SIZE,
        })
          .then((data) => {
            res.json({ data: data });
          })
          .catch((er) => {
            throw er;
          });
      } else if (status && !page) {
        PriceService.findAndCountAll({
          where: { status: status },
          order: [["id", "DESC"]],
        })
          .then((data) => {
            res.json({ data: data });
          })
          .catch((er) => {
            throw er;
          });
      } else {
        PriceService.findAndCountAll({
          where: { status: status },
          order: [["id", "DESC"]],
          offset: soLuongBoQua,
          limit: PAGE_SIZE,
        })
          .then((data) => {
            res.json({ data: data });
          })
          .catch((er) => {
            throw er;
          });
      }
    } else {
      PriceService.findAndCountAll({ order: [["id", "DESC"]] })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    }
  };
  exports.findone = (req, res) => {
    PriceService.findOne({ where: { id: req.params.id } })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  };
  exports.findallprice = (req, res) => {
    PriceService.findAndCountAll({
        order: [["id", "ASC"]]
    })
      .then((data) => {
        Service.findAndCountAll({
            order: [["id", "ASC"]],
            // where: { checkAdmin: 2 },
            where: { status: 1 },
        }).then((data2) => {
            Weight.findAndCountAll({
                order: [["id", "ASC"]],
                // where: { checkAdmin: 2 },
                where: { status: 1 },
            }).then((data3) => {
            let arrayData = [];
            let newObjrct;
            'use strict';
            data.rows.forEach((el) => {
                newObjrct = {
                        ...el.dataValues,
                        ...{weight: ""},
                        ...{service: ""},
                    }
                    arrayData.push(newObjrct)
            })
            arrayData.forEach((el) => {
                data2.rows.forEach((el2) => {
                    data3.rows.forEach((el3) => {
                        if(el.weightId === el3.id ){
                            el.weight = el3.weight;
                        }
                        if(el.serviceId === el2.id ){
                            el.service = el2.name;
                        }
            })
        })
        })
            res.json({ data: arrayData });
    })
            // res.json({ data: arrayData });
          })
        // res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
}
  exports.delete = (req, res) => {
    PriceService.destroy({ where: { id: req.params.id } })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  };
  exports.update = (req, res) => {
    PriceService.update(req.body, { where: { id: req.params.id } })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
    };