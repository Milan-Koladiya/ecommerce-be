// const multer=require("multer")
// const path=require("path")

// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'public/uploads/')
//     },
//     filename:function(req,file,cb){
//         cb(null,Date.now()+path.extname(file.originalname))
//     }
// })

// const upload=multer({storage:storage});

// module.exports={upload}


const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'public/uploads/',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
});

const upload = multer({ storage });

module.exports = { upload };
