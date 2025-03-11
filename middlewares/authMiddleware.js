exports.auth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Non authentifié" });
    }
    next();
};
exports.isAdmin=(req,res,next)=>{
    if (req.session.role !== "admin") {
        return res.status(403).json({ message: "Accès refusé. Seuls les administrateurs peuvent effectuer cette action." });
    }
    next();
}