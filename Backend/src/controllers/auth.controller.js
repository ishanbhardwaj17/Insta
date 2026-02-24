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
            id: user._id,
            username: user.username
            
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

async function loginController(req, res) {
    try {
        const { email, username, password } = req.body;

        // 1. Validate input
        if ((!email && !username) || !password) {
            return res.status(400).json({
                message: "Email or username and password are required",
            });
        }

        // 2. Find user + explicitly include password
        const user = await userModel
            .findOne({
                $or: [{ email }, { username }],
            })
            .select("+password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // 3. Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // 4. Generate token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 5. Set cookie
        res.cookie("token", token);

        // 6. Response
        res.status(200).json({
            message: "Login successful",
            user: {
                email: user.email,
                username: user.username,
                bio: user.bio,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id);
        res.status(200).json({
            user: {
                email: user.email,
                username: user.username,
                bio: user.bio,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

module.exports = { registerController, loginController, getMeController };
