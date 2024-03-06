const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = 'SUA_CHAVE_SECRETA'; // Você deve gerar uma chave segura e armazená-la de forma segura, não a deixe hardcoded assim em produção!

const authService = {
  // Gerar um token JWT
  generateToken: (user) => {
    const payload = {
      userId: user.id,
      username: user.username
      // Você pode adicionar mais campos do usuário aqui conforme necessário
    };

    const options = { expiresIn: '2h' }; // O token expira em 2 horas

    // Assinar o token com o payload e a chave secreta
    return jwt.sign(payload, secretKey, options);
  },

  // Verificar o token JWT
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          reject(err); // O token é inválido ou expirou
        } else {
          resolve(decoded); // Decodificado contém o payload do token
        }
      });
    });
  },

  // Hash de senha
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },

  // Verificar senha
  comparePassword: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  }
};

module.exports = authService;