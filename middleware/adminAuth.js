const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) return res.status(401).json({ msg: 'Sin token, acceso denegado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        // Check if userType is admin type
        if(req.user.userType != 1) {
            return res.status(401).json({ msg: 'Solo administradores pueden tener acceso a esta ruta' });
        }

        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: 'El token no es válido' });
    }
}