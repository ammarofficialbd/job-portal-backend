import {Company} from '../models/company.model.js'
export const registerComapny= async(req ,res) =>{
    try {
        const {companyName} = req.body;
        if(!companyName) {
            return res.status(400).json({
                message: "Company Name is Required",
                success: false
            })
        }
        let company = await Company.findOne({name: companyName});
        if(company) {
            return res.status(400).json({
                message: "Company Name is already exist",
                success: false
            }) 
        }
       company = Company.create({
            name: companyName,
            userId: req.id
       })
       return res.status(201).json({
        message: "Company register Successfully",
        success: true
    }) 
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async(req, res)=>{
    try {
        const userId = req.id;
        console.log(userId);
        const companies = await Company.find({userId})
        if(!companies) {
            return res.status(404).json({
                message: "Companies is Not Fond",
                success: false
            }) 
        }
        return res.status(200).json({
            companies,
            message: "companies founded",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyBYID = async(req, res)=>{
    try {
        const userId = req.params.id;
        const company = await Company.findById({userId})
        if(!company) {
            return res.status(404).json({
                message: "Company is Not Fond",
                success: false
            }) 
        }
        return res.status(200).json({
            companies,
            message: "company founded",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async(req, res) =>{
    try {
        const companyId = req.params.id;
        console.log(companyId);
        console.log("hi");
        const {name, description, website, location} = req.body;
        const file = req.file;
        //cloudinary 
    
        const updateData = {name, description, website, location};
    
        const company = await Company.findByIdAndUpdate(companyId, updateData, {new : true})
    
        if(!company) {
            return res.status(404).json({
                message: "Company is Not Fond",
                success: false
            }) 
        }
        return res.status(200).json({
            company,
            message: "company Updated",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
  
}