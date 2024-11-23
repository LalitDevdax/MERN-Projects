import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; //jwt because we wrote jwt in utils.js while creating cookieand to grab token from cookie we need cookie-parser and import in index.js

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    //to decode token we need to verify token with jwt_secret created by us
    const decoded = jwt.verify(token, process.env.jwt_secret);
    console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userID).select("-password"); //.select means we are deselcting password as we dont want it to be sent to user again (security  )

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
