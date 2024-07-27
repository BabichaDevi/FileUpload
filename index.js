//App create
const express=require("express");
const app=express();
//PORT FInd
require("dotenv").config();
const PORT=process.env.PORT||3000;

//Middleware mount
app.use(express.json());
const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

//DB connection
const db=require("./config/database");
db.connect();

//Connect with cloud
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount
const Upload=require("./routes/FileUpload");
app.use('/api/v1/upload',Upload);

//activate server
app.listen(PORT,()=>{
    console.log(`APP is running at ${PORT}`);
})


