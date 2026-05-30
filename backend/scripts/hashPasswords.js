
const db             = require('../db');
const { hashPassword } = require('../libs/hashedPassword');

const data = db.readDB();

data.users = data.users.map((user) => {

  if (user.password.startsWith('$2')) {
    console.log(`  [o'tkazildi] ${user.username}: allaqachon hashlangan`);
    return user;
  }
  const hashed = hashPassword(user.password);
  console.log(`  [hashlandi]  ${user.username}: "${user.password}" → bcrypt hash`);
  return { ...user, password: hashed };
});

db.writeDB(data);
console.log('\ndb.json muvaffaqiyatli yangilandi!');
