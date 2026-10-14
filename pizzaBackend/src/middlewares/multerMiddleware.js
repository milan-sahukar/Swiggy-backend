// const multer = require('multer');
// const path = require('path');  

// const storageConfiguration = multer.diskStorage({
//     destination: (req,file, next) => {
//         next(null, 'uploads/')
//     },
//     filename:(req, file, next) => {
//         console.log(file)
//         next(null, `${Date.now()}-${path.extname(file.originalName)}`)
//     }
// });

// const uploader = multer({
//     storage: storageConfiguration
// });

// module.exports = uploader;


const multer = require('multer');
const path = require('path');  

const storageConfiguration = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'uploads/');
    },
    filename: (req, file, next) => {  // Fixed typo here
        console.log(file);
        next(null, `${Date.now()}-${file.originalname}`);  // Fixed filename construction
    }
});

const uploader = multer({
    storage: storageConfiguration
});

module.exports = uploader;