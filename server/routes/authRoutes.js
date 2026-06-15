const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hash
        });

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const result = await bcrypt.compare(
            password,
            user.password
        );

        if (!result) {
            return res.status(400).send(
                "Invalid credentials"
            );
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).send(
            "Something went wrong"
        );
    }
});

router.get("/logout", (req, res) => {
    res.status(200).json({
        message: "Logged out successfully"
    });
});

router.get("/", (req, res) => {
    res.send("api running");
});

module.exports = router;