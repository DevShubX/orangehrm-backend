const { User } = require("../models/User.model");
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {

    try {
        const { userRole, employeeName, status, username, password } = req.body;

        if (!userRole || !employeeName || !status || !username || !password) {
            return res.status(400).json({ error: "Missing Fields" });
        }

        const exisitingUser = await User.findOne({ username });

        if (exisitingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            employeeName,
            status,
            userRole,
            password: hashedPassword
        });

        return res.status(200).json({
            message: "New User Created Successfull",
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: error.message || "",
        });
    }

};

const getUsersList = async (req, res) => {
    try {

        const { username, userRole, employeeName, status } = req.query;

        let filter = {};

        if (username) {
            filter.username = { $regex: username, $options: "i" }; // case-insensitive partial match
        }
        if (userRole) {
            filter.userRole = userRole; // exact match
        }
        if (employeeName) {
            filter.employeeName = { $regex: employeeName, $options: "i" };
        }
        if (status) {
            filter.status = status;
        }


        const users = await User.find(filter).select('-password');
        return res.status(200).json({
            message: "User list fetched successfully",
            users,
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: error.message || "",
        });
    }
}


module.exports = { createUser, getUsersList };