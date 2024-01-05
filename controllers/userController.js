import User from "../models/User.js"; // User model definition using Mongoose
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userController = {
  async signup(req, res) {
    try {
      const { name, email, password } = req.body;
      // Handle validation, hashing passwords, etc.
      // Respond with success message or user data
      const Salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(password, Salt);
      const user = new User({ name, email, password: pass });

      await user.save();
      // Save user to the database, assuming User.create() or similar method from Mongoose
      
      res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {

      // Check if the user exists in the database and verify credentials
      // Respond with success message or user data, maybe including authentication tokens
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.json({message : "User doesn't exist"});
      } 
      console.log(user);
      const pass = await bcrypt.compare(password, user.password);
      console.log(pass);

      if (pass) {
        let token = jwt.sign({_id : user._id}, process.env.SECRET_KEY ) //yha p id ko encode kr ja rha hai token m 
        // _id - payload | user._id - ko token banao
        // res.cookie("P2", token, {expiresIn : '7d', httpOnly : true});
       return res.status(200).json({ message : "User logged in successfully", token });
      }else{
        return res.json({message : "wrong/invalid credentials"});
      }
    
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },


  // need improvement 

  // logout(req, res){
  //   // res.clearCookie("P2");

  //   res.json({message : "You Successfully Logout!"})
  // },

  
  authChecker(req, res){
    res.json({message : true});
  },
};

export default userController;
