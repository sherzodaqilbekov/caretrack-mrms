const db = require('../db');
const { hashPassword, comparePassword } = require('../libs/hashedPassword');

function getAll(req, res) {
  const users = db.getAll('users').map(({ password, ...u }) => u);
  res.json(users);
}

function getOne(req, res) {
  const user = db.getById('users', req.params.id);
  if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
  const { password, ...safe } = user;
  res.json(safe);
}

function create(req, res) {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ error: 'Barcha maydonlar majburiy' });
  }

  const VALID_ROLES = ['admin', 'clinician', 'receptionist'];
  if (!VALID_ROLES.includes(role)) {
    return res.status(400).json({ error: "Noto'g'ri rol" });
  }

  const existing = db.getAll('users').find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) {
    return res.status(409).json({ error: 'Bu email allaqachon mavjud' });
  }

  const newUser = db.create('users', {
    fullName,
    email: email.toLowerCase(),
    password: hashPassword(password),
    role,
  });

  const { password: _, ...safe } = newUser;
  res.status(201).json(safe);
}

function update(req, res) {
  const { fullName, email, password, role } = req.body;
  const id = req.params.id;

  const existing = db.getById('users', id);
  if (!existing) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });

  if (email) {
    const duplicate = db.getAll('users').find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.id !== Number(id)
    );
    if (duplicate) {
      return res.status(409).json({ error: 'Bu email allaqachon mavjud' });
    }
  }

  const VALID_ROLES = ['admin', 'clinician', 'receptionist'];
  if (role && !VALID_ROLES.includes(role)) {
    return res.status(400).json({ error: "Noto'g'ri rol" });
  }

  const changes = {};
  if (fullName) changes.fullName = fullName;
  if (email)    changes.email    = email.toLowerCase();
  if (role)     changes.role     = role;
  if (password) changes.password = hashPassword(password);

  const updated = db.update('users', id, changes);
  const { password: _, ...safe } = updated;
  res.json(safe);
}

function remove(req, res) {
  const id = Number(req.params.id);

  if (id === req.user.id) {
    return res.status(400).json({ error: "O'zingizni o'chira olmaysiz" });
  }

  const existed = db.remove('users', id);
  if (!existed) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
  res.json({ message: "Foydalanuvchi o'chirildi" });
}

// O'z profilini ko'rish — hamma rol uchun (parol qaytarilmaydi)
function getMe(req, res) {
  const user = db.getById('users', req.user.id);
  if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
  const { password, ...safe } = user;
  res.json(safe);
}

// O'z parolini o'zgartirish — hamma rol uchun
function changeMyPassword(req, res) {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Joriy va yangi parol majburiy' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Yangi parol kamida 6 ta belgidan iborat bo\'lishi kerak' });
  }

  const user = db.getById('users', req.user.id);
  if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });

  // Joriy parolni tekshiramiz
  const match = comparePassword(currentPassword, user.password);
  if (!match) {
    return res.status(400).json({ error: 'Joriy parol noto\'g\'ri' });
  }

  db.update('users', req.user.id, { password: hashPassword(newPassword) });
  res.json({ message: 'Parol muvaffaqiyatli o\'zgartirildi' });
}

module.exports = { getAll, getOne, create, update, remove, getMe, changeMyPassword };
