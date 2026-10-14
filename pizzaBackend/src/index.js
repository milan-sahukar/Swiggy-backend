const express = require("express");


const ServerConfig = require(`./config/serverConfig.js`);
const connectDB = require('./config/dbConfig.js');
const userRouter = require("./routes/userRoute.js");
const cartRouter = require("./routes/cartRoute.js");
const authRouter = require("./routes/authRoute.js");
const cookieParser = require('cookie-parser');
const uploader = require("./middlewares/multerMiddleware.js");
const cloudinary = require('./config/cloudinaryConfig.js');
const fs = require('fs/promises');
const productRouter = require("./routes/productRoute.js");
const orderRouter = require("./routes/orderRoutes.js");
// const User = require("./schema/userSchema.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/carts', cartRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);


app.get('/ping',  (req, res) => {
    console.log(req.body);
    console.log(req.cookies); 
    return res.json({
        message: 'pong'
    })
});

app.post('/photo', uploader.single('incomingFile'), async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(" Result from cloudinary", result);
    await fs.unlink(req.file.path);
    return res.json({
        message: 'Received photo'
    })
})
app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${ServerConfig.PORT}`);
    
    /*const newUser = await User.create({
        firstName: "John",
        lastName: "Doe",
        mobileNumber: 6372529330,
        email: "shadowheist0@gmail.com",
        password: "passwor123"
    });

    console.log("first user created", newUser);*/

        
});
 