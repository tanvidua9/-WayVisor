const JWT_SECRET=process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Missing or invalid Authorization header");
        return res.status(403).json({ message: "Unauthorized: Missing token" });
    }

    const token = authHeader.split(' ')[1];
    console.log("Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded Token:", decoded);

        if (decoded.userId) {
            req.userId = decoded.userId;
            console.log("User ID Set:", req.userId);
            next();
        } else {
            console.log("Token does not contain userId");
            return res.status(403).json({ message: "Unauthorized: Invalid token" });
        }
    } catch (err) {
        console.log("Token Verification Failed:", err.message);
        return res.status(403).json({ message: "Unauthorized: Invalid or expired token" });
    }
};

module.exports = {
    authMiddleware
};
