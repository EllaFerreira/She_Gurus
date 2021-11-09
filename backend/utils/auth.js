const jwt = require("jsonwebtoken");

const secret = "My Secretsssshhh";
const expiration = "1h";

module.exports = {
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  logOut() {
    localStorage.removeItem("_id_token");
    window.location.assign("/");
  },
};
