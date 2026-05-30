const jwt                 = require('jsonwebtoken');
const db                  = require('../db');
const { comparePassword } = require('../libs/hashedPassword');
const config              = require('../libs/config');

function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email va parol majburiy' });
  }

  const user = db.getAll('users').find(
    (u) => u.email && u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return res.status(401).json({ error: "Email yoki parol noto'g'ri" });
  }

  const match = comparePassword(password, user.password);
  if (!match) {
    return res.status(401).json({ error: "Email yoki parol noto'g'ri" });
  }

  const token = jwt.sign(
    { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES }
  );

  res.json({
    token,
    fullName: user.fullName,
    email:    user.email,
    role:     user.role,
  });
}

module.exports = { login };
