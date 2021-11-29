const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const {SECRET} =require('../config');

// @DESC To register the user
const userRegister = async (userDets, role, res) => {
    try {
      // Validate the username
      let usernameTaken = await validateUsername(userDets.username);
      if (usernameTaken) {
        return res.status(400).json({
          message: `Username is already taken.`,
          success: false
        });
      }
  
      // validate the email
      let emailTaken = await validateEmail(userDets.email);
      if (emailTaken) {
        return res.status(400).json({
          message: `Email is already registered.`,
          success: false
        });
      }
  
      // Get the hashed password
      const password = await bcrypt.hash(userDets.password, 12);
      // create a new user
      const newUser = new User({
        ...userDets,
        password,
        role
      });
  
      await newUser.save();
      return res.status(201).json({
        message: "User was registered",
        success: true
      });
    } catch (err) {
      
      return res.status(500).json({
        message: "Unable to create your account.",
        success: false
      });
    }
};


const userLogin = async (userCreds, role, res) =>{
    let {username, password} = userCreds;
    //First check if username is in the database
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json({
            message: `Username is not found, invalid login credentials.`,
            success: false
          });
    }

    if(user.role !== role){
        return res.status(403).json({
            message: `Please make sure you are logging in from correct portal`,
            success: false
          });
    }

    //user is valid and is logging through correct portal
    //now passw

    let isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        //sign in the token and issue the token to user.
        let token = jwt.sign(
            {
                user_id: user._id,
                role: user.role, 
                username: user.username,
                email: user.email
            }, 
            SECRET, 
            {expiresIn: "7 days"}
        );

        let result = {
            username: user.username,
            role: user.role, 
            email: user.email,
            token: `Bearer ${token}`, 
            expiresIn: 168

        }

        return res.status(200).json({
            ...result,
            message: "User is now logged in",
            success: true
          });

    }else{
        return res.status(403).json({
            message: `Incorrect password`,
            success: false
          });
    }


}

const validateUsername = async username =>{
    let user = await User.findOne({username});
    return user ? true : false;
}

const validateEmail = async email =>{
    let user = await User.findOne({email});
    return user ? true : false;
}

module.exports = {
    userRegister,
    userLogin
}