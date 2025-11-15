const users = [
  { user: "123", pass: "123", role: "user", token: "user" },
];

export function verifyUser(user, pass) {
  const userFound = users.find((u) => u.user === user && u.pass === pass);
  return userFound ? { role: userFound.role, token: userFound.token } : null;
}
