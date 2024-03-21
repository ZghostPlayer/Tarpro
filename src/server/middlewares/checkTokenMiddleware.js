const jwt = require('jsonwebtoken');
const secretKey = 'SUA_CHAVE_SECRETA';
const { User } = require('../../../models');

const checkTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  console.log('Authorization header:', req.headers.authorization);
  console.log('Token:', token);


  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    req.user = user;
    console.log('req.user set in middleware:', req.user);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido.' });
  }
};

module.exports = checkTokenMiddleware;