const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token || access_token === null) {
      throw { name: "unauthenticated" };
    }
    const payload = verifyToken(access_token);
    let user = await User.findOne({ where: { id: payload.id } });

    if (!user) throw { name: "unauthenticated" };
    req.user = {
      userId: user.id,
      userEmail: user.email,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
