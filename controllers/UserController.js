const User = require("../modules/UserModule");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


// register
exports.signup = async (req, res) => {
    try {
        const {  email, password  } = req.body;
        const user  = await User.findOne({ email });
        console.log(' user', user)
        if(user) {
            return res.status(500).json({
                message: 'Account have!',
                success: false
            })
        };
        const paswordHash = bcrypt.hashSync(password, 10);
        
        await User.create({
            name : email[0], email, password, passwordConf: paswordHash
        });

        return res.status(200).json({
            message: 'User registered successfully!',
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

// login
exports.signin = async (req, res) => {
    const { email , password } = req.body;
    try {
        const user = await User.findOne({email});
    if(!user) {
        return res.status(401).josn({message: 'Invalid user', status: 0});
    }
    const isMatch = await bcrypt.compare(password, user.passwordConf);
    if(!isMatch) {
        return res.status(401).json({
            message: 'Invalid name or password',
            status: 0
        });
    } 
    const token = jwt.sign({ _id: user._id },  process.env.KEY_SECRET , { expiresIn: '1d'});
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false  
    });
    res.json({
        message: "Login Success",
        status: 1
    })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 0
        })
    }
}

// forgot password or name 
exports.forgot = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        return res.status(400).json({
            message: "Do not match email"
        })
    } 
}