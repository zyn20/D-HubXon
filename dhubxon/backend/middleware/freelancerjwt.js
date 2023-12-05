const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
console.log("I am in Freelancertoken");
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, 'NATIONAL UNIVERSITY', (err, user) => {
        if (err) {
            return res.redirect('/login');
        }

        req.user = user; // Attach the decoded user information to the request object
        next(); // Pass control to the next middleware or route handler
    });
};

module.exports = authenticateToken;
