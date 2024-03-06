const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Pega o token do cabeçalho

  if (token == null) return res.sendStatus(401); // Se não houver token, acesso negado

  // Verifica o token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Se o token for inválido ou expirou, acesso proibido

    req.user = user; // Se o token for válido, salva o usuário no request para uso posterior
    next(); // Permite que o jogador (usuário) prossiga para a próxima etapa (middleware/route handler)
  });
};

module.exports = verifyToken;