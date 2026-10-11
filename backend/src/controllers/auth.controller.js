import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
// import {cookie} from "cookie-parser"
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
  try {
    const { username, email, password } = req.body;

    // enter all fields
    if (!username || !email || !password) {
      return res.status(400).json({ massage: "all fields are required" });
    }

    // check if the user is already exists
    const userAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userAlreadyExist) {
      return res.status(409).json({
        message: "username or email already exists",
      });
    }

    // hashed the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "user is successfully registered",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "registration failed", error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.username,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
