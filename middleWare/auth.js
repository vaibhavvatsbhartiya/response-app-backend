// routes and controller k bich ka bicholiya

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// login krne k baad token generate hoga

// this code is used to verify token

const isAuth = async (req, res, next) => {
 try{
  //  console.log(req.signedCookies);
    // const token = req.cookies.P2 ; //koi toh error hai  p2 undefined
  //  console.log(req.rawHeaders);
  //  console.log(req.rawHeaders[17].split("=")[1]);
  //  const token = req.rawHeaders[17].split("=")[1];
    console.log(token);
    if(!token){
      return res.json({message : "Please Login First!"})
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY); // token to id 
   //  console.log(token);
    req.user = await User.findById(decoded._id);
    next(); // pass to next function
 }catch(err){
    res.json({message : err.message});
 }

}

export default isAuth;
