const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "FirstName is required"],
      minlength: [3, "FirstName must be at least 5 characters long"],
      lowercase: [true, "FirstName must be in lowercase"],
      trim: true, // if the user gives extra spaces then it will automatically remove it
      maxlength: [20, "FirstName must be at most 20 characters long"],
    },

    lastName: {
      type: String,
      required: [true, "LastName is required"],
      minlength: [3, "LastName must be at least 5 characters long"],
      lowercase: [true, "LastName must be in lowercase"],
      trim: true, // if the user gives extra spaces then it will automatically remove it
      maxlength: [20, "LastName must be at most 20 characters long"],
    },

    mobileNumber: {
      type: String,
      minlength: [10, "MobileNumber must be at least 10 digits long"],
      maxlength: [10, "MobileNumber must be at most 10  digits long"],
      unique: [true, "MobileNumber must be unique"],
      required: [true, "MobileNumber is required"],
    },

    email: {
      type: String,
      trim: true, // if the user gives extra spaces then it will automatically remove it
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      match: [
        /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@gmail\.com$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [20, "Password must be at most 20 characters long"],
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword; // setting the hashed password to the user object before saving it.
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
