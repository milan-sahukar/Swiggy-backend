const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const UnauthorisedError = require("../utils/unauthorisedError");

async function isLoggedIn(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      data: {},
      message: "No token provided",
      error: "Not Authenticated",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      throw new UnauthorisedError();
    }

    //if reached here, then user is authenticated allow them to access
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: {},
      message: "Invalid token",
      error: error,
    });
  }

  // if (!decoded) {
  //   return res.status(401).json({
  //     success: false,
  //     data: {},
  //     message: "Invalid token",
  //     error: "Not Authenticated",
  //   });
  // }
}

/**
 * This function checks if the authenticatd user is an admin or not
 * Because we will call iAdmin after isLoggedIn thats why we will recieve user details
 *
 */
function isAdmin(req, res, next) {
  const loggedInUser = req.user;
      console.log("User is ", loggedInUser);
  if (loggedInUser.role === "ADMIN") {

    next();
    console.log(loggedInUser);
  } else {
    return res.status(401).json({
      success: false,
      data: {},
      message: "Unauthorized access",
      error: {
        statusCode: 401,
        reason: "Unauthorised user for this action",
      }
    });
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
};
