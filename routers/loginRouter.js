const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
// Import models
const User = require("../models/usersModel");

router.route("/")
    .post(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordValid) {
            res.status(400).json({
                message: "Invalid email or password "
            });
        };

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.cookie("jwt", token, { httpOnly: true, secure: false });

        res.json({
            message: "Here is your cookie for subsequent requests !",
        });
    });

module.exports = router;