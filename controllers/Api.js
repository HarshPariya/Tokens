const bcrypt =require('bcrypt');
const saltRound = 10;
const secretKey = 'harsh@01#95'
const jwt = require('jsonwebtoken')

const arr = []; //mock database 

const register = async(req,res)=>{
const {email,password} = req.body;
const existingUser = arr.find((user)=>user.email === email);
if(existingUser){
   return res.status(400).send({msg:"Email id is already exists"})
}

const hashPassword = await bcrypt.hash(password,saltRound);
const newUser = {email,password:hashPassword};
arr.push(newUser);

const token = jwt.sign({email},secretKey);
res.status(201).send({msg:"User Registered successfully",token});

}

const login = async(req,res)=>{
    const {email,password} = req.body;
    const existingUser = arr.find((user)=>user.email === email);
    if(!existingUser){
       return res.status(404).send({msg:"User is not registered"})
    }

    const isValidPassword = bcrypt.compare(password,user.password);
    if(!isValidPassword){
        return res.status(401).send({msg:"Password is incorrect"})
    }

    const token = jwt.sign({email},secretKey,{expireIn:"5m"});
    res.status(201).send({msg:"User login successfully",token});
    
    }

const home=(req,res)=>{
    res.send({msg:"This is home page"})
}

const dashboard=(req,res)=>{
    res.send({msg:"Welcome to dashboard"})
}


module.exports={login,register,home,dashboard};
