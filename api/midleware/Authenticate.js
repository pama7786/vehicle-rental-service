import jwt from "jsonwebtoken";
import 'dotenv/config'
const SECRET_KEY = process.env.SECRET_KEY;

function authenticate(req, res, next) {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({
            message: "Authentication failed - missing token",
        });
    }

    const tokenWithoutBearer = token.split(" ")[1];

    // verify the token
    jwt.verify(tokenWithoutBearer, SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                message: "Authentication failed - invalid token",
            });
        }

        // attach the decoded token to the request object
        req.decoded = decoded;

        // continue with the request
        next();

    }
    );

}

export default authenticate;