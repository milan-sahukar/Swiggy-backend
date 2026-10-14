 const dotenv = require('dotenv');
 dotenv.config();

 //ENV variables
 module.exports = {
        PORT: process.env.PORT || 5500,
        DB_URL: process.env.DB_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRE: process.env.JWT_EXPIRE,
        CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
    }