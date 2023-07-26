var CategoryPet = require("../models").CategoryPet;
var Pet = require("../models").Pet;
require("dotenv").config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
  CategoryPet.create(req.body)
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
      CategoryPet.findAndCountAll({
        order: [["id", "ASC"]],
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
      CategoryPet.findAndCountAll({
        where: { status: status },
        order: [["id", "ASC"]],
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else {
      CategoryPet.findAndCountAll({
        where: { status: status },
        order: [["id", "ASC"]],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
      })
        .then((data) => {
            console.log("data",data);
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    }
  } else {
    CategoryPet.findAndCountAll({ order: [["id", "ASC"]] })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.countTypePet = (req, res) => {
    CategoryPet.findAndCountAll({
        order: [["id", "ASC"]]
    })
      .then((data) => {
        Pet.findAndCountAll({
            order: [["id", "ASC"]],
            // where: { checkAdmin: 2 },
            where: { status: 1 },
        }).then((data2) => {
            let arrayData = [];
            let arrayCount = [];
            let newObjrct;
            'use strict';
            function count(array, x){
                // console.log("aaaa",array, x);
                let count = 0;
                for(let i=0;i<array.length;i++){
                  if(array[i].CategoryPetId==x)
                    count ++;
                }
                return count;
            }
            data2.rows.forEach((el2) => {
                data.rows.forEach((el) => {
                    if(el.id === el2.CategoryPetId ) {
                arrayCount.push({id: el2.CategoryPetId, value:count(data2.rows,el.id)})
                    }
                })
            })
            arrayCount.shift()
            data.rows.forEach((el) => {
                newObjrct = {
                        ...el.dataValues,
                        ...{count: 0}
                    }
                    arrayData.push(newObjrct)
            })
            arrayData.forEach((el) => {
                arrayCount.forEach((elT) => {
                if(el.id === elT.id ){
                    el.count = elT.value;
                }
            })
        })
            res.json({ data: arrayData });
          })
        // res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
}
exports.findone = (req, res) => {
  CategoryPet.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  CategoryPet.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  CategoryPet.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
