import jwt from "jsonwebtoken";
import fs from "fs";
import AppError from "../errors/AppError.js";

const verifyAndRefreshToken = (req, res, next) => {
  const token =
    req.cookies.accessToken && req.cookies.accessToken.split(" ")[1];
  const refreshToken = req.cookies.refreshToken;

  if (!token) {
    return next(new AppError("unauthenticated user"));
  }

  const ACCESS_TOKEN_PUB_KEY = fs.readFileSync("accessToken_publicKey.pem");

  jwt.verify(
    token,
    ACCESS_TOKEN_PUB_KEY,
    { algorithms: ["RS256"] },
    (err, user) => {
      if (err && err.name === "TokenExpiredError") {
        if (!refreshToken) {
          return next(new AppError("unauthenticated user"));
        }

        const REFRESH_TOKEN_PUB_KEY = fs.readFileSync(
          "refreshToken_publicKey.pem"
        );

        jwt.verify(
          refreshToken,
          REFRESH_TOKEN_PUB_KEY,
          {
            algorithms: ["RS256"],
          },
          (err, refreshUser) => {
            if (err) return next(new AppError("unauthenticated user"));

            const ACCESS_TOKEN_PRIV_KEY = fs.readFileSync(
              "accessToken_privateKey.pem"
            );

            const newAccessToken = jwt.sign(
              {
                id: refreshUser.id,
                username: refreshUser.username,
              },
              ACCESS_TOKEN_PRIV_KEY,
              {
                algorithm: "RS256",
                expiresIn: "15m",
              }
            );

            res.cookie("accessToken", newAccessToken, {
              httpOnly: true,
              sameSite: "Strict",
              maxAge: 15 * 60 * 1000,
              secure: true,
            });

            req.user = refreshUser;
            next();
          }
        );
      } else if (err) {
        return next(new AppError("Invalid access token error"));
      } else {
        req.user = user;
        next();
      }
    }
  );
};

export default verifyAndRefreshToken;
