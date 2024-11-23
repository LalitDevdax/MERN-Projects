//generating token : to generate token we need environment varialbe
//we need payload and res as parameter while generating token and take it as unique like userid
//while creating token using sign method give payload as object and third parameter as object and in middle give secret key generated in env
//then after creating token send it to cookies by res.cookies and provide first parameter as any name and other the token created and third as optional but it for more protection

import jwt from "jsonwebtoken";

export const generateToken = async (userID, res) => {
  const token = jwt.sign({ userID }, process.env.jwt_secret, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //millisec
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
