const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("Middleware")
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Accès non autorisé, token manquant" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next(); 
    } catch (err) {
        res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = authMiddleware;