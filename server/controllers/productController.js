const { Sequelize } = require("sequelize");
const { Product, Category, Image, User, sequelize } = require("../models");
class ProductController {
  static async getAllProduct(req, res, next) {
    try {
      const data = await Product.findAll({
        include: [
          {
            model: Category,
          },
          {
            model: Image,
          },
          {
            model: User,
          },
        ],
        order: [["id", "ASC"]],
      });

      res.status(200).json({
        data,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Product.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: Category,
          },
          {
            model: Image,
          },
        ],
      });
      if (!data) throw { name: "productNotFound" };
      res.status(200).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  }
  static async createProduct(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { userId } = req.user;
      const { name, description, price, mainImg, categoryId, images } =
        req.body;
      const splitName = name.split(" ");
      const slug = splitName.join("-");

      const data = await Product.create(
        {
          name,
          description,
          price,
          mainImg,
          categoryId,
          slug,
          authorId: userId,
        },
        { transaction: transaction }
      );
      const bulkImage = images.map((el) => {
        return { imgUrl: el, productId: data.id };
      });
      const createImage = await Image.bulkCreate(bulkImage, {
        transaction: transaction,
      });

      await transaction.commit();
      res.status(200).json({
        userId,
        data,
        createImage,
      });
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Product.findOne({ where: { id: id } });
      if (!data) throw { name: "productNotFound" };

      await Image.destroy({ where: { productId: id } });
      await Product.destroy({ where: { id: id } });
      res.status(200).json({
        messagge: `Product with id: ${id}, deleted`,
      });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }
  static async editProduct(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const { id } = req.params;
      const { name, description, price, mainImg, categoryId, images, imageId } =
        req.body;
      const splitName = name.split(" ");
      const slug = splitName.join("-");
      await Product.update(
        { name, description, price, mainImg, slug, categoryId },
        { where: { id: id } },
        { transaction: transaction }
      );
      await Image.update(
        { imgUrl: images[0] },
        { where: { id: imageId[0] } },
        { transaction: transaction }
      );
      await Image.update(
        { imgUrl: images[1] },
        { where: { id: imageId[1] } },
        { transaction: transaction }
      );
      await Image.update(
        { imgUrl: images[2] },
        { where: { id: imageId[2] } },
        { transaction: transaction }
      );

      await transaction.commit();

      res.status(200).json({
        message: `Product with id ${id}, updated`,
      });
    } catch (err) {
      await transaction.rollback();

      next(err);
    }
  }
}
module.exports = ProductController;
