const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({
        status: "You are not logged in! Please login to get access"
    });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({
            status: ""
        });

        req.user = user;
        next();
    })
}

module.exports = { authenticateToken };