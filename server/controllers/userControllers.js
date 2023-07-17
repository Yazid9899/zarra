const { signToken } = require("../helpers/jwt");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { User } = require("../models");
class UserController {
  static async register(req, res, next) {
    try {
      let { email, password, phoneNumber, address } = req.body;
      console.log(req.body);
      const data = await User.create({
        email,
        password,
        phoneNumber,
        address,
        role: "Admin",
      });

      res.status(200).json({
        message: "Success register",
        email: data.email,
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        throw { name: "loginError" };
      }

      const user = await User.findOne({ where: { email: email } });
      if (!user) throw { name: "loginError" };

      if (!comparePassword(password, user.password))
        throw { name: "loginError" };

      const access_token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        access_token,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
