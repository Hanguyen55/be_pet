var Bill = require("../models").Bill;
var Revenue = require("../models").Revenue;
require("dotenv").config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
  console.log(req.body);
  Bill.create(req.body)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.revenues = (req, res) => {
    var status = req.query.status;
    Bill.findAndCountAll({
        where: { status: status },
        // order: [["id", "DESC"]],
        // offset: soLuongBoQua,
        // limit: PAGE_SIZE,
      })
        .then((data) => {
            let date = new Date();
            let month = ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
            let year = date.getFullYear();
            let monthList = [];
            let present = month+"/"+year;
            let presentData;
            let totalMoney = 0;
            for (let i = 0; i < data.count; i++) {
                totalMoney+=Number(data.rows[i].dataValues.price)
            }
            Revenue.findAndCountAll().then((data2) => {
                for (let i = 0; i < data2.count; i++) {
                    monthList.push(data2.rows[i].dataValues.name)
                    if(data2.rows[i].dataValues.name === present) {
                        presentData = data2.rows[i].dataValues
                    }
                }
                let dataNew = {name: present, money: totalMoney}
                function findValue(haystack,needle) {
                    for(const item of haystack) {
                       if(item === needle) {
                          return true;
                       }
                    }
                    return false;
                 }
                if(findValue(monthList,present)) {
                    Revenue.update(dataNew, { where: { id: presentData.id } })
                } else {
                    Revenue.create(dataNew)
                }
            })
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
}
exports.findall = (req, res) => {
  var page = req.query.page;
  var status = req.query.status;
  page = parseInt(page);
  let soLuongBoQua = (page - 1) * PAGE_SIZE;
  if (page || status) {
    if (page && !status) {
      Bill.findAndCountAll({
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
      Bill.findAndCountAll({
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
      Bill.findAndCountAll({
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
    Bill.findAndCountAll({ order: [["id", "DESC"]] })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.findone = (req, res) => {
  Bill.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  Bill.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  Bill.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
