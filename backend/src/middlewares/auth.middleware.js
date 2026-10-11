import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

// middleware to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) return res.json({ success: false, message: "user not found" });

    req.user = user;
    console.log("The Decoded user is : ", req.user);

    next();
  } catch (error) {
    res.status(400).json({
      message: "Token is not valid",
    });
  }
};
