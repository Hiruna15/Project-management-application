import jwt from "jsonwebtoken";
import fs from "fs";
import AppError from "../errors/AppError";

const authentificate = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return next(new AppError("cookie expired. please login againg"));

  const tokenParts = token.split(" ");

  const PUB_KEY = fs.readFileSync("public_key.pem");

  if (
    tokenParts[0] === "Bearer" &&
    tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
  ) {
    try {
      const decoded = jwt.verify(tokenParts[1], PUB_KEY, {
        algorithms: ["RS256"],
      });
      req.user = decoded;
      next();
    } catch (err) {
      throw new AppError("You are not authorized to access this route");
    }
  } else {
    throw new AppError("You are not authorized to access this route");
  }
};

export default authentificate;
