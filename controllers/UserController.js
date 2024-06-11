const User = require("../modules/UserModule");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(" user", user);
    if (user) {
      return res.status(500).json({
        message: "Account have!",
        success: false
      });
    }
    const paswordHash = bcrypt.hashSync(password, 10);

    await User.create({
      name: email[0],
      email,
      password,
      passwordConf: paswordHash
    });

    return res.status(200).json({
      message: "User registered successfully!",
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

// login
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  console.log("sign in", email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid user", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.passwordConf);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid name or password",
        success: false
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.KEY_SECRET, {
      expiresIn: "1d"
    });
    const refreshToken = jwt.sign({ _id: user._id }, process.env.KEY_REFRESH_TOKEN, {
      expiresIn: "30d"
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false
    });
    res.json({
      message: "Login Success",
      accessToken: token,
      refreshToken: refreshToken,
      user: {
        emai: user.email,
        name: user.name
      },
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      ssuccess: false
    });
  }
};

// forgot password or name
exports.forgot = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Do not match email"
    });
  }
};

exports.getuser = async (req, res) => {
    console.log('req.user', req.user)
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    return res.status(200).json({
      data: user,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

exports.updateuser = async (req, res) => {
    const { name, phone, address } = req.body;
    const { id } = req.user; // Ensure req.user is populated by the authentication middleware
  
    try {
      // Find the user by ID
      let user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false
        });
      }
  
      // Update user details
      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.address = address || user.address;
  
      // Save updated user
      await user.save();
  
      // Return updated user data
      return res.status(200).json({
        data: user,
        success: true
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        success: false
      });
    }
  };
