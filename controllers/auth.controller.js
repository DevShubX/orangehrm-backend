const { User } = require("../models/User.model");
const bcrypt = require('bcrypt');
const { createJWT, authenticateJWT } = require('../lib/jwtTokenMethods');
const jwt = require('jsonwebtoken');

const signinUser = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username && !password) {
            return res.status(200).json({ error: "Username or Password is required" });
        }

        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.status(400).json({ error: "User does not exists" });

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

        const token = createJWT(existingUser._id, existingUser.username);

        return res.status(200).json({
            message: "Login Successfull",
            token: token,
            user: existingUser,
        });


    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: error.message || "",
        });
    }
};


const authorizeUser = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        // Verify token
        const {isVerified, user} = authenticateJWT(token, process.env.JWT_SECRET);

        if (!isVerified || !user) return res.status(401).json({ message: "Invalid or expired token" });

        const existingUser = await User.findById(user.uid).select("-password"); // exclude password
        if (!existingUser) {
            return res.status(401).json({ message: "User not found" });
        }

        return res.json({ user: existingUser });
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = { signinUser, authorizeUser };