
const jwt    = require('jsonwebtoken');
const config = require('../libs/config');


function authenticate(req, res, next) {
  const header = req.headers['authorization'];

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Avtorizatsiya talab qilinadi' });
  }

  const token = header.split(' ')[1]; 

  try {
    req.user = jwt.verify(token, config.JWT_SECRET);
    next(); 
  } catch {
    res.status(401).json({ error: "Token noto'g'ri yoki muddati tugagan" });
  }
}


function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Bu amalni bajarishga ruxsat yo\'q' });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
