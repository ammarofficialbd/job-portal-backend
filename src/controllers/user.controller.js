import {User} from "../models/user.model.js"
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

export const register = async(req, res)=>{
    try {
        const {fullname, email, phoneNumber, password, role } = req.body
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "Something Is Wrong Or Missing",
                success: false
            })
        };
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                message: "User Already Created",
                success: false
            })
        }
        const hashPasswordd = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashPasswordd,
            role
        })
return res .status(201)
    } catch (error) {
        
    }
}

export const login = async(req,res) =>{
 try {
    const {email, password, role } = req.body
    if(!email || !password || !role){
        return res.status(400).json({
            message: "Something Is Wrong Or Missing",
            success: false
        })
    };

    let user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({
            message: "Incorrect Email Or password",
            success: false
        })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch) {
        return res.status(400).json({
            message: "Incorrect Password",
            success: false
        })
    }

    if(role !== user.role){
        return res.status(400).json({
            message: "Account dosen't exist with current role",
            success: false
        })
    }

    const tokenId = {
        userId : user._id
    }
    
    const token  = jwt.sign(tokenId, process.env.SECRET_KEY, {expiresIn: '1d'})

 user = {
    _id : user._id,
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: user.profile 
 }

    return res.status(200).cookie("token", token ,{
        maxAge: 1*24*60*60*1000,
        httpsOnly: true,
        sameSite: 'strict'
        
    }).json({
        message: `welcome back ${user.fullname}`,
        user,
        success: true
    })
 } catch (error) {
    console.log(error);
 }
}

export const logOut = async(req, res) =>{
    try {
        return res.status(200).cookie("token", {maxAge: 0}).json({
            message: "Logged out SuccessFully",
            success: true
        })
        
    } catch (error) {
        console.log(error);
    }

}

export const updateProfile = async (req , res)=>{
    try {
        const {fullname, email, phoneNumber, skills, bio } = req.body;
        const file = req.file;
    
//cloudinary comes here
    let skilledArray;

        const userId = req.id //middlewere auth

        let user = await User.findById(userId)
        if(!user) {
            return res.status(400).json({
                message: "User not Found",
                success: false
            })
        }

        //profile updating
        if(fullname){
            user.fullname = fullname
        }
        if(email){
            user.email = email
        }
        if(phoneNumber){
            user.phoneNumber = phoneNumber
        }
        if(bio){
            user.profile.bio = bio
        }
       if(skills){
            skilledArray = skills.split(",");
            user.profile.skills = skilledArray;
       }
        
       await user.save();

       
        user = {
            _id : user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile 
         }

       

        return res.status(200).json({
                message: "Profile Update Succesfully",
                success: false
            })
 //user.profile.resume comes later
    } catch (error) {
        console.log(error );
    }

}