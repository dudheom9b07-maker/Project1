const user = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const existingUser = await user.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user: { name: existingUser.name, email: existingUser.email } });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// GET USERS
exports.getUsers = async (req, res) => {
    try {
        const users = await user.find().select("-password");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const updatedUser = await user.findByIdAndUpdate(
            id,
            { name, email },
            { new: true }
        ).select("-password");

        res.status(200).json(updatedUser);

    } catch (err) {
        console.error("updating user error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await user.findByIdAndDelete(id);

        res.status(200).json({ message: "User deleted successfully" });

    } catch (err) {
        console.error("deleting user error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

//Image storing and retriving

exports.uploadProfileImage = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await user.findByIdAndUpdate(
            id,
            { profileImage: req.file.path },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        console.error("Error uploading profile image:", err);
        res.status(500).json({ message:"image upload failed" });
    }
};