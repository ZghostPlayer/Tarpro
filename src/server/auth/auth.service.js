const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = 'SUA_CHAVE_SECRETA'; 
const authService = {
  
  generateToken: (user) => {
    const payload = {
      userId: user.id,
      username: user.username
      
    };

    const options = { expiresIn: '24h' };

    
    return jwt.sign(payload, secretKey, options);
  },

  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  },

  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },

  comparePassword: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },
  
  getUserIdFromToken: (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },
};

module.exports = authService;