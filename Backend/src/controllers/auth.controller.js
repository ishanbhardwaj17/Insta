const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.model");

async function registerController(req, res) {
    const { email, username, password, bio, profileImage } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409)
            .json({
                message: "User already exists " + (isUserAlreadyExists.email == email ? "Email already exists" : "Username already exists")
            })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hashedPassword
    })

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User Registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })


}

module.exports = { registerController };
