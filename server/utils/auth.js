const jwt = require("jsonwebtoken");

const secret = "secreeshtssssss";
const expiration = "2h";

module.exports = {
  //check if there is an existing token in request
  //if there is an existing token we will verify and decode the token
  authMiddleware: function ({ req }) {
    //Check for token in different places
    let token = req.body.token || req.query.token || req.headers.authorization;

    // We split the token string into an array and return actual token
    // Remove "barear" from token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      //retunr payload data and add to user
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      console.log(error);
    }

    // return the request object so it can be parsed to the resolver as `context`
    return req;
  },

  //Receives information which we want to include in the payload
  signToken: function ({ email, surname, _id, user_type }) {
    //Create payload object
    const payload = { email, surname, _id, user_type };
    //Asign the values to the jwt token
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
