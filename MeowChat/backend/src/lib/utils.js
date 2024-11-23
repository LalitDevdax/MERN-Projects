//generating token : to generate token we need environment varialbe
//we need payload and res as parameter while generating token and take it as unique like userid
//while creating token using sign method give payload as object and third parameter as object and in middle give secret key generated in env
//then after creating token send it to cookies by res.cookies and provide first parameter as any name and other the token created and third as optional but it for more protection

import jwt from "jsonwebtoken";

