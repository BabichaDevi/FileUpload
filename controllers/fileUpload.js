const File=require("../models/File");
const cloudinary=require("cloudinary").v2;

//it will upload to the server
//localfile ->handler function

exports.localFileUpload=async(req,res)=>{
    try{
        //fetch file from request
        const file=req.files.file;
        console.log("FIle reached -> ",file);

        //create path where file need to be stored on server
        let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;
        console.log("Path-> ",path)

        //add path to the move person
        file.mv(path,(err)=>{
            console.log(err);
        });

        //create a successfull response
        res.json({
            success:true,
            message:'Local file Uploaded Successfully',
        });
    }
    catch(error){
        console.log(error);
    }
}

//image uplaod handler

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};
    console.log("temp file path",file.tempFilePath);

    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload= async(req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes=['jpg',"jpeg",'png'];

        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("File type: ",fileType); 

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:true,
                message:'file format not supported'
            })
        }

        //file formate  supported
        console.log("Uploading to cloaduinary");
        const response= await uploadFileToCloudinary(file,"fileUpload");
        console.log(response);

        //db  entry save
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })


        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully Uploaded"
        })
    }

    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });
    }
}

//video upload handler

exports.videoUpload=async(req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags.email);

        const file=req.files.videoFile;

        //validation
        const supportedTypes=['mp4','mov'];

        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("File type: ",fileType); 

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:true,
                message:'file format not supported'
            })
        }

        //file formate  supported
        console.log("Uploading to cloaduinary");
        const response= await uploadFileToCloudinary(file,"fileUpload");
        console.log(response);

        //db  entry save
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })


        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Vidoe Successfully Uploaded"
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}

exports.imageSizeReducer=async(req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes=['jpg',"jpeg",'png'];

        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("File type: ",fileType); 

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:true,
                message:'file format not supported'
            })
        }

        //file formate  supported
        console.log("Uploading to cloaduinary");
        const response= await uploadFileToCloudinary(file,"fileUpload",30);
        console.log(response);

        //db  entry save
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })


        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully Uploaded"
        })

    }

    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}