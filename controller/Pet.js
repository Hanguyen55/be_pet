var Pet = require("../models").Pet;
var Product = require("../models").Product;
var Category = require("../models").Category;
var CategoryPet = require("../models").CategoryPet;
var ImagePet = require("../models").ImagePet;
const Op = require("Sequelize").Op;
var User = require("../models").User;
require("dotenv").config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
//   console.log(req.body);
  Pet.create(req.body, { include: ["imgpet"] })
    .then((data) => {
        ImagePet.findAll({ where: { petId : null}})
        .then((data2) => {
            for (let i = 0; i < data2.length; i++) {
                let newData= {id: data2[i].dataValues.id,petId: data.dataValues.id}
                ImagePet.update(newData, { where: { id: newData.id } })
            }
          })
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
      Pet.findAndCountAll({
        order: [["createdAt", "DESC"]],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
        where: { 
            status: 1,
            // checkAdmin: 2,
             quantity: { [Op.ne]: 0 } },
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else if (status && !page) {
      Pet.findAndCountAll({
        where: { status: status,
            //  checkAdmin: 2,
              quantity: { [Op.ne]: 0 } },
        order: [["createdAt", "DESC"]],
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else {
      Pet.findAndCountAll({
        where: { status: status,
            //  checkAdmin: 2, 
             quantity: { [Op.ne]: 0 } },
        order: [["createdAt", "DESC"]],
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
    Pet.findAndCountAll({
      order: [["createdAt", "DESC"]],
      where: {
         status: 1,
        //  checkAdmin: 2,
         quantity: { [Op.ne]: 0 } },
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.getAllShop = (req, res) => {
  var page = req.query.page;
  var CategoryPetId = req.query.CategoryPetId;
  var name = req.query.name;
  var category = req.query.category;
  var petOrProduct = req.query.petOrProduct;
  page = parseInt(page);
  let soLuongBoQua = (page - 1) * PAGE_SIZE;
  if (petOrProduct === "pet") {
    if (CategoryPetId && name) {
      Pet.findAndCountAll({
        where: {
          status: 1,
        //   checkAdmin: 2,
          CategoryPetId: CategoryPetId,
          name: { [Op.like]: `%${name}%` },
        },
        order: [["createdAt", "DESC"]],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else if (CategoryPetId && !name) {
      Pet.findAndCountAll({
        where: { status: 1, 
            // checkAdmin: 2,
             CategoryPetId: CategoryPetId },
        order: [["createdAt", "DESC"]],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else if (!CategoryPetId && name) {
      Pet.findAndCountAll({
        where: {
          status: 1,
        //   checkAdmin: 2,
          name: { [Op.like]: `%${name}%` },
        },
        order: [["createdAt", "DESC"]],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else {
      Pet.findAndCountAll({
        where: { status: 1,
            //  checkAdmin: 2
             },
        order: [["createdAt", "DESC"]],
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
    Product.findAndCountAll({
      where: { status: 1, name: { [Op.like]: `%${name}%` } },
      order: [["createdAt", "DESC"]],
      offset: soLuongBoQua,
      limit: PAGE_SIZE,
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
          where: { status: 1, name: category },
        },
      ],
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.checkPet = (req, res) => {
  var page = req.query.page;
  page = parseInt(page);
  let soLuongBoQua = (page - 1) * PAGE_SIZE;
  if (page) {
    Pet.findAndCountAll({
    //   where: { status: { [Op.ne]: [0] } },
    //   where: { checkAdmin: { [Op.ne]: [0] } },
      order: [["id", "DESC"]],
      offset: soLuongBoQua,
      limit: PAGE_SIZE,
      include: [{ model: User, attributes: ["firstName", "lastName"] }],
    })
      .then((data) => {
        console.log("checkPet",data.dataValues);
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  } else {
    Pet.findAndCountAll({
      where: {
        status: { [Op.ne]: [0] },
        // checkAdmin: { [Op.ne]: [0] },
      },
      order: [["id", "DESC"]],
      include: [User],
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.findone = (req, res) => {
  Pet.findOne({
    where: { id: req.params.id },
    include: ["imgpet"],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.getPetUser = (req, res) => {
  Pet.findAndCountAll({ where: { userId: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  Pet.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.countTypePet = (req, res) => {
  Pet.findAll({
    where: { status: 1 },
    // where: { checkAdmin: 2 },
    attributes: ["CategoryPetId"],
  })
    .then((data) => {
        CategoryPet.findAndCountAll({
            order: [["id", "DESC"]],
        }).then((test)=>{
            let dog = 0;
            let cat = 0;
            let other = 0;
            for (let i = 0; i < data.length; i++) {
              const element = data[i].dataValues.CategoryPetId;
              if (element === 1) {
                dog += 1;
              } else if (element === 2) {
                cat += 1;
              } else {
                other += 1;
              }
            }
            res.json({
              count1: dog,
              count2: cat,
              countOther: other,
              countAll: test.length,
            });
        })
      
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  Pet.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};

exports.updateQuantity = (req, res) => {
  Pet.bulkCreate(req.body, {
    updateOnDuplicate: ["quantity"],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
