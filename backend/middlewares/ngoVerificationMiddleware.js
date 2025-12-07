const verifyNGO = (req, res, next) => {
    if (!req.ngo || !req.ngo.verificationStatus) {
        return res.status(403).json({ message: 'NGO not verified' });
    }
    next();
};

module.exports = verifyNGO;
