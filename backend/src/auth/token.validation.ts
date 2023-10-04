import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a custom interface that extends the Express Request interface
interface CustomRequest extends Request {
  decoded?: any; // Add decoded property to Request
}

export const tokenValidation = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.get("authorization");
  if (token) {
    // Remove Bearer from string
    token = token.slice(7);
    jwt.verify(token, process.env.JWT_KEY || "", (err, decoded) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Invalid Token...",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: 0,
      message: "Access Denied! Unauthorized User",
    });
  }
};
