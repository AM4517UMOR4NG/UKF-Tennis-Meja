module.exports = function(req, res, next) {
  const auth = req.headers.authorization;
  const key = process.env.ADMIN_API_KEY;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = auth.split(' ')[1];
  if (!token || token !== key) return res.status(403).json({ message: 'Forbidden' });
  next();
};

