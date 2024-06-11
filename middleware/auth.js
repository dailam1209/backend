const jwt = require("jsonwebtoken");
const User = require("../modules/UserModule")
const catchAsyncErrors = require("./catchAsyncErrors");


exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next) =>{
  let token;
  if(req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    console.log('token', token)

    try {
      if(token) {
        const decoded = jwt.verify(token, process.env.KEY_SECRET);
        console.log(decoded._id)
        const user = await User.findById(decoded?._id);
        console.log('user nya', user)
        req.user = user;
        next();
      }
    } catch (err) {
      res.status(401).json({
        success: false,
        message: err.message
    })

    }
  } else {
    throw new Error("There is no token attached to header");
  }
});


