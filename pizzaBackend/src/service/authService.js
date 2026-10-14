const bcrypt = require("bcrypt");
const { findUser } = require("../repository/userRepository");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE } = require("../config/serverConfig");

async function loginUser(authDetails) {
  const email = authDetails.email;
  const plainPassword = authDetails.password;
 
  // 1. check if there is registered user with the given email

  const user = await findUser({ email });

  if (!user) {
    // user not found
    throw { message: "No user found with the given email", statusCode: 404 };
  }

  // 2. if the user is found we need to compare plainIncoming Password with hashed Password.
  const isPasswordValidated = await bcrypt.compare(
    plainPassword,
    user.password
  );

  if (!isPasswordValidated) {
    // password is incorrect
    throw { message: "Password is incorrect, try again", statusCode: 401 };
  }
  const userRole = user.role ? user.role : "USER";
  // 3. if the password is validated, create a token and return it.
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
      role: userRole
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE  }
  );
  return token;
}

module.exports = { loginUser };
