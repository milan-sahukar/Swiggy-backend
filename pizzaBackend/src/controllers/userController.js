// const express = require("express");

// const { registerUser } = require("../service/userService.js");


// async function createUser(req, res) {
//   console.log("controller called");
//   console.log(req.body);


//   // Validate the input data
//   try {
//     const user = await registerUser(req.body);
//     return res.json({
//       message: "Successfully registered the user",
//       success: true,
//       data: response,
//       error: {},
//     });
//   } catch (error) {
//     return res.status(error.status).json({
//       message: "Failed to register the user",
//       success: false,
//       data: {},
//       error: error 
//     });
//   }
// }

// module.exports = {
//   createUser,
// };



const express = require("express");
const { registerUser } = require("../service/userService.js");

async function createUser(req, res) {
  console.log("controller called");
  console.log(req.body);

  try {
    const user = await registerUser(req.body);
    return res.status(201).json({  // ✅ Set a valid status code
      message: "Successfully registered the user",
      success: true,
      data: user,  // ✅ Use `user` instead of `response`
      error: {},
    });
  } catch (error) {
    console.error("Error registering user:", error);

    return res.status(error.status || 500).json({  
      message: "User already exists",
      success: false,
      data: {},
      error: error.message 
    });
  }
}

module.exports = {
  createUser,
};
