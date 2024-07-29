const jwt = require('jsonwebtoken');


const { jwtSecret } = require('../config/config');


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    const result = verifyAccessToken(token);

    if (!result.success) {
        return res.status(401).json({ error: result.error });
    }

    req.user = result.data;
    next();

}

function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return { success: true, data: decoded };
    } catch (err) {
        return { success: false, error: err.message };
    }
}


module.exports = authenticateToken;